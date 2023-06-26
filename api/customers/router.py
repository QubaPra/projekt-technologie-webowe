from fastapi import APIRouter, HTTPException
from .storage import get_customers_storage
from .schema import CustomerCreateSchema, CustomerUpdateSchema, Customer

router = APIRouter()

CUSTOMERS_STORAGE = get_customers_storage()


@router.get("/")
async def get_customers() -> list[Customer]:
    return list(get_customers_storage().values())


@router.get("/{customer_id}")
async def get_customer(customer_id: int) -> Customer:
    try:
        return CUSTOMERS_STORAGE[customer_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Customer with ID={customer_id} does not exist."
        )

@router.patch("/{customer_id}")
async def update_customer(
    customer_id: int, updated_customer: CustomerUpdateSchema
) -> Customer:
    if customer_id not in CUSTOMERS_STORAGE:
        raise HTTPException(
            status_code=404, detail=f"Customer with ID={customer_id} does not exist."
        )
    customer = CUSTOMERS_STORAGE[customer_id]
    updated_fields = updated_customer.dict(exclude_unset=True)
    for field, value in updated_fields.items():
        setattr(customer, field, value)
    return customer

@router.delete("/{customer_id}")
async def delete_customer(customer_id: int) -> None:
    try:
        del CUSTOMERS_STORAGE[customer_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Customer with ID={customer_id} does not exist."
        )

@router.post("/")
async def create_customer(customer: CustomerCreateSchema) -> Customer:
    customer_id = max(CUSTOMERS_STORAGE.keys(), default=0) + 1
    new_customer = Customer(id=customer_id, **customer.dict())
    CUSTOMERS_STORAGE[customer_id] = new_customer
    return new_customer