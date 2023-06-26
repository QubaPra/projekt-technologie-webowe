from functools import lru_cache

from .schema import Order

OrderStorageType = dict[int, Order]

ORDERS: OrderStorageType = {}

ORDERS[1] = Order(id=1, customer_fullname="Olivia Martin", product_name="Desk", quantity=1)
ORDERS[2] = Order(id=2, customer_fullname="William Kim", product_name="Lamp", quantity=4)
ORDERS[3] = Order(id=3, customer_fullname="Isabella Nguyen", product_name="Carpet", quantity=2)
ORDERS[4] = Order(id=4, customer_fullname="Ethan Brown", product_name="Lamp", quantity=2)
ORDERS[5] = Order(id=5, customer_fullname="Alan Brown", product_name="Carpet", quantity=1)
ORDERS[6] = Order(id=6, customer_fullname="Ethan Martin", product_name="Desk", quantity=1)


@lru_cache(maxsize=1)
def get_orders_storage() -> OrderStorageType:
    return ORDERS
