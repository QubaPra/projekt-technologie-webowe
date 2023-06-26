from fastapi import APIRouter, HTTPException
from .storage import get_orders_storage
from .schema import Order, OrderCreateSchema, OrderUpdateSchema

router = APIRouter()

ORDERS_STORAGE = get_orders_storage()


@router.get("/")
async def get_orders() -> list[Order]:
    return list(get_orders_storage().values())

@router.get("/{order_id}")
async def get_order(order_id: int) -> Order:
    try:
        return ORDERS_STORAGE[order_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Order with ID={order_id} does not exist."
        )

@router.patch("/{order_id}")
async def update_order(
    order_id: int, updated_order: OrderUpdateSchema
) -> Order:
    if order_id not in ORDERS_STORAGE:
        raise HTTPException(
            status_code=404, detail=f"Order with ID={order_id} does not exist."
        )
    order = ORDERS_STORAGE[order_id]
    updated_fields = updated_order.dict(exclude_unset=True)
    for field, value in updated_fields.items():
        setattr(order, field, value)
    return order

@router.delete("/{order_id}")
async def delete_order(order_id: int) -> None:
    try:
        del ORDERS_STORAGE[order_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Order with ID={order_id} does not exist."
        )

@router.post("/")
async def create_order(order: OrderCreateSchema) -> Order:
    order_id = max(ORDERS_STORAGE.keys(), default=0) + 1
    new_order = Order(id=order_id, **order.dict())
    ORDERS_STORAGE[order_id] = new_order
    return new_order