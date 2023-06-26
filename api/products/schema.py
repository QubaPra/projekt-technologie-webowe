from pydantic import BaseModel

class ProductCreateSchema(BaseModel):
    name: str
    price: float
    description: str

    class Config:
        schema_extra = {
            "example": {
                "name": "Desk",
                "price": 199.99,
                "description": "A modern desk with 3 drawers."                    
            }
        }

class ProductUpdateSchema(BaseModel):
    price: float | None

    class Config:
        schema_extra = {
            "example": {                
                "price": 199.99,                  
            }
        }


class Product(ProductCreateSchema):
    id: int