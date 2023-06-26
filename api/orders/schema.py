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
    product_name: str | None
    quantity: int | None    

    class Config:
        schema_extra = {
            "example": {                
                "product_name": "Desk",  
                "quantity": 1         
            }
        }


class Order(OrderCreateSchema):
    id: int