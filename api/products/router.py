from fastapi import APIRouter
from .storage import get_products_storage
from .schema import Product

router = APIRouter()

CUSTOMERS_STORAGE = get_products_storage()


@router.get("/")
async def get_products() -> list[Product]:
    return list(get_products_storage().values())