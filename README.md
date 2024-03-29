# JSON-Parser

# About
Parse json to javascript classes.

# Setup
Check out the [example](https://github.com/ludescher/typescript-json-parser/tree/main/Example).

## 1. Register all relevant Classes

```js
ClassManager.RegisterClass(User);
ClassManager.RegisterClass(Company);
ClassManager.RegisterClass(Task);
ClassManager.RegisterClass(Vehicle);
```

## 2. Prepare json (fetch)
```json
{
    "id": 1,
    "created": 1617291318,
    "modified": 1617291318,
    "name": "Test Company",
    "employees": [
        {
            "id": 11,
            "roles": [
                "ROLE_DRIVER"
            ],
            "firstname": "Franz",
            "lastname": "Josef",
            "email": "franz.j@company.com",
            "active": true,
            "company": {
                "id": 1
            }
        },
        {
            "id": 12
        }
    ],
    "vehicles": [
        {
            "id": 21,
            "brand": "Man",
            "model": "TGX",
            "licenceplate": "D M-AN 0001",
            "color": "blue"
        },
        {
            "id": 22,
            "brand": "Man",
            "model": "TGX",
            "licenceplate": "D M-AN 0005",
            "color": "green"
        },
        {
            "id": 23
        }
    ],
    "tasks": [
        {
            "id": 31,
            "address": "MAN Truck & Bus Deutschland GmbH, Max-Eyth-Straße, Neuenstein, Germany",
            "payload": "500 pizzas (lunch)",
            "driver": {
                "id": 11
            },
            "vehicle": {
                "id": 22
            }
        },
        {
            "id": 32,
            "address": "Allianz Arena, Werner-Heisenberg-Allee, Munich, Bayern, Germany",
            "payload": "Staff, youth players as well as equipment.",
            "driver": {
                "id": 12,
                "roles": [
                    "ROLE_DRIVER"
                ],
                "firstname": "Peter",
                "lastname": "Panzer",
                "email": "peter.p@company.com",
                "active": true,
                "company": {
                    "id": 1
                }
            },
            "vehicle": {
                "id": 23,
                "brand": "Man",
                "model": "eTGE",
                "licenceplate": "D M-AN 0012",
                "color": "red"
            }
        }
    ]
}
```

## 3. Parse json with the expected class identifier

```js
/** @type {Company} COMPANY */
const COMPANY = parseAsClass(Company.EntityIdentifier, JSON_STRING);
```

# Structure

## `AbstractEntity`

**Signature**:

```js
class AbstractEntity {
    static EntityIdentifier: string;
    static UniqueIdentifier: string;
    static TypeMap: ITypeMapEntry = {};
    static ConversionTypeMap: IConversionTypeMapEntry = {};
    entityId: string | null = null;
}
```

## `SupportedType`

**Signature**:

```js
enum SupportedType {
    String,
    Number,
    Boolean,
    Relation,
    ArrayRelation,
    Array,
    Object,
    Null,
    Date
}
```

## `EntityManager`

**Signature**:

```js
class EntityManager {
    static All(): EntityEntryMap;
    static Get(entityId: string): AbstractEntity | undefined;
    static Add(entity: AbstractEntity, handler: Function, rclass: ClassType): AbstractEntity;
    static Remove(entityId: string): void;
}
```

## `ClassManager`

**Signature**:

```js
class ClassManager {
    static RegisterClass(rclass: ClassType): void;
    static UnregisterClass(entity_identifier: string): void;
    static ClassIsRegistered(entity_identifier: string): boolean;
    static GetRegisteredClass(entity_identifier: string): ClassType | undefined;
}
```

## `parseAsClass`

**Signature**:

```js
function parseAsClass(entity_identifier: string, json_string: string): AbstractEntity | any[] | null;
```