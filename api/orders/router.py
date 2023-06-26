from fastapi import APIRouter
from .storage import get_orders_storage
from .schema import Order

router = APIRouter()

CUSTOMERS_STORAGE = get_orders_storage()


@router.get("/")
async def get_orders() -> list[Order]:
    return list(get_orders_storage().values())