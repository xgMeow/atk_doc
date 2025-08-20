# GetObject

通过对象路径获取 ATK 对象

``python
GetObject(objectPath)
```


输入对象路径`objectPath`，返回一个路径对应的ATK对象

```matlab
sat = GetObject("Satellite/satellite1")
sensor = GetObject("Satellite/satellite1/Sensor/sensor1")
```


