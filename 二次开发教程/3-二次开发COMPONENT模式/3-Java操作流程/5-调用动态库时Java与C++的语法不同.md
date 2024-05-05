# 调用动态库时Java与C++的语法不同

## 调用符号语法不同

C++：因为项目中成员实现方式为指针，只支持指针调用”->”。

举例：
```
pIScen->Children;
```

Java：java 将所有类型进行了封装，只支持点调用”.”。

举例：
```
pIScenario.GetChildren();
```

## 类成员调用方式不同

C++：直接调用变量名获取

举例：
```
pIScen->Children;
```

Java：只能通过函数获取，java 会将 c++类中的所有公有成员自动封装 get 和 set 函数。

举例：
```
pIScenario.GetChildren();
```

## 枚举值使用不同

C++：支持单独使用枚举值

举例：
```
pISatellite->SetPropagatorType(ePropagatorAstrogator);
```

Java：必须前置添加枚举类型。

举例：
```
pISatellite.SetPropagatorType(EVePropagatorType.ePropagatorAstrogator);
```

## 类型转换方式不同

C++：支持直接强制

举例：
```
pIVADriverMCS = (IVADriverMCS*)pISatellite->Propagator;
```
Java：必须调用接口函数实现（变量实际指向在 C++中实现，java 无法获
取变量的当前实际类型），接口函数在 C++接口项目中实现，因为没有封装成
类，对应的 java 封装函数实现在模板 java 文件 example.java 中。

举例：
```
IVADriverMCS pIVADriverMCS = example.IVePropagator2IVADriverMCS(pISatellite.GetPropagator());
```
