from fastapi import APIRouter, HTTPException
from .storage import get_products_storage
from .schema import Product, ProductCreateSchema, ProductUpdateSchema

router = APIRouter()

PRODUCTS_STORAGE = get_products_storage()


@router.get("/")
async def get_products() -> list[Product]:
    return list(get_products_storage().values())

@router.get("/{product_id}")
async def get_product(product_id: int) -> Product:
    try:
        return PRODUCTS_STORAGE[product_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Product with ID={product_id} does not exist."
        )

@router.patch("/{product_id}")
async def update_product(
    product_id: int, updated_product: ProductUpdateSchema
) -> Product:
    if product_id not in PRODUCTS_STORAGE:
        raise HTTPException(
            status_code=404, detail=f"Product with ID={product_id} does not exist."
        )
    product = PRODUCTS_STORAGE[product_id]
    updated_fields = updated_product.dict(exclude_unset=True)
    for field, value in updated_fields.items():
        setattr(product, field, value)
    return product

@router.delete("/{product_id}")
async def delete_product(product_id: int) -> None:
    try:
        del PRODUCTS_STORAGE[product_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Product with ID={product_id} does not exist."
        )

@router.post("/")
async def create_product(product: ProductCreateSchema) -> Product:
    product_id = max(PRODUCTS_STORAGE.keys(), default=0) + 1
    new_product = Product(id=product_id, **product.dict())
    PRODUCTS_STORAGE[product_id] = new_product
    return new_product