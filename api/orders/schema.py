from pydantic import BaseModel

class OrderCreateSchema(BaseModel):
    customer_fullname: str
    product_name: str
    quantity: int

    class Config:
        schema_extra = {
            "example": {
                "customer_fullname": "Olivia Martin",
                "product_name": "Desk",
                "quantity": 1
            }
        }

class OrderUpdateSchema(BaseModel):
    price: float | None

    class Config:
        schema_extra = {
            "example": {                
                "price": 199.99,                  
            }
        }


class Order(OrderCreateSchema):
    id: int