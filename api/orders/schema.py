from pydantic import BaseModel

class Order(BaseModel):
    id: int
    customer_fullname: str
    product_name: str
    quantity: int