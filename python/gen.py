import pydantic
from typing import List, Optional
from pathlib import Path
from yomi import to_yomi


class ItemNameReading(pydantic.BaseModel):
    id: str
    name: str
    yomi: Optional[List[str]]


class ItemNameReadings(pydantic.BaseModel):
    items: List[ItemNameReading]


base = Path(__file__)
base = base.parent.parent
data_path = base.joinpath('data', 'readings.json')
data = ItemNameReadings.parse_file(data_path)

for item in data.items:
    item.yomi = [to_yomi(item.name)]

with data_path.open(mode='w') as f:
    f.write(data.json(ensure_ascii=False, indent=2))
