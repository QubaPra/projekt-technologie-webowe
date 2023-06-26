from functools import lru_cache

from .schema import Product

ProductStorageType = dict[int, Product]

PRODUCTS: ProductStorageType = {}

PRODUCTS[1] = Product(id=1, name="Desk", price=199.99, description="A modern desk with 3 drawers.")
PRODUCTS[2] = Product(id=2, name="Lamp", price=29.99, description="A modern lamp that will look great on your desk.")
PRODUCTS[3] = Product(id=3, name="Carpet", price=99.99, description="A modern carpet that will look great on your floor.")

@lru_cache(maxsize=1)
def get_products_storage() -> ProductStorageType:
    return PRODUCTS
