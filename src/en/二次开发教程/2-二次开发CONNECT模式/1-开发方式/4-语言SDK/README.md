---
description: Common notes shared by the five language SDKs.
index: false
---

# Language SDK

ATK provides SDKs for the following five languages. You can reference the ATK communication library in your own development environment and interact with ATK over a TCP network connection:

- **[Python](1-Python/1-简介与配置.md)** — Python communication library, suitable for automation scripts and rapid development
- **[Matlab](2-Matlab/1-简介与配置.md)** — Matlab communication library, invoked through the built-in Java interface, compatible with Matlab R2015b and later
- **[C++](3-C++/1-简介与配置.md)** — C++ library files, supporting Windows (VS2015~2022) and Linux
- **[Java](4-Java/1-简介与配置.md)** — Java communication library, built on JNI, requires JDK 8 or later
- **[Octave](5-Octave/1-简介与配置.md)** — Octave communication library, invoked through the built-in Java interface, compatible with Octave 5.2.0 and later

## Common Notes

All language SDKs share the following common features:

- **Communication method**: interact with ATK over a TCP network connection, default port `6655`
- **Core API**: all provide the three core interfaces `atkOpen` / `atkConnect` / `atkClose`. For Python and C++, both parameters of `atkOpen` have default values (`"127.0.0.1"`, `6655`), so the parameters can be omitted to connect directly, and `atkConnect` takes 3 arguments; Java, Matlab and Octave have no default parameters, so the IP and port of `atkOpen` must be passed explicitly, and `atkConnect` takes 4 arguments (the 4th is a reserved parameter — pass `""` for Java and Octave, and `''` for Matlab)
- **Command format**: all use the unified [Connect command syntax](../../2-命令参考/1-命令语法约定.md)
- **Library file location**: for Python, Java, Matlab and Octave, the **interface files and library files all live in the root directory of the ATK installation package** — for Python they are `ATKConnectPython.py` / `_ATKConnectPython.pyd`; Java, Matlab and Octave reuse `ATKConnectJava.jar` / `ATKConnectJava.dll`. Under the Kylin environment the directory is the same, only the suffix changes from `.dll` to `.so`. C++ is the exception: its header files and library files are located under `IntegratingWithATK\connect\C++\`. Auxiliary files such as example source code and usage notes are placed in the corresponding language folder under `IntegratingWithATK\connect\`
- **Example source location**: the complete examples for each language are published under **`Help\Examples\08-二次开发案例\`**, with file names of the form `ATKConnect<Language>Test.<ext>` (such as `ATKConnectPythonTest.py`, `ATKConnectJavaTest.java`, `ATKConnectMatlabTest.m`, `ATKConnectOctaveTest.m`). The "Complete Example" page of each language directly references the file in that directory instead of repeating the code; the C++ example is `IntegratingWithATK\connect\C++\src\ex-InclinationChange.cpp`

<Catalog />
