# RF Environment

## Functional Description

An RF environment is used to describe the additional propagation loss of a radio signal caused by environmental factors such as atmospheric gases, rain, clouds, and fog during propagation. These losses are added to the free-space propagation loss and other link losses, and further affect communication performance metrics such as the received power, $C/N_0$, $C/N$, $E_b/N_0$, and the bit error rate.

The current RF Environment page includes two parts: **atmospheric absorption** and **cloud, rain, and fog attenuation parameters**. Atmospheric absorption accounts for the absorption of electromagnetic waves by atmospheric gases; the cloud, rain, and fog attenuation parameters set the propagation environment parameters for rain and for cloud and fog layers.

> **Note**: An RF environment model takes part in the link calculation only after the corresponding 【Use】 option or model check box is selected. The environment parameters describe the propagation medium itself.

## Atmospheric Absorption

Atmospheric absorption is used to estimate the propagation attenuation of a radio signal caused by the absorption of atmospheric constituents such as oxygen and water vapor as the signal passes through the atmosphere. The current model uses the surface temperature and the water vapor density to describe the near-ground atmospheric state, and calculates the atmospheric absorption loss together with the signal frequency and the propagation path.

| Parameter | Description |
|---|---|
| Use | Enables the atmospheric absorption model. When it is not selected, the atmospheric absorption loss does not take part in the current RF environment calculation. |
| Surface Temperature | Air temperature near the ground surface. This parameter takes part in the calculation of the atmospheric absorption coefficient. |
| Water Vapor Density | Water vapor concentration near the ground surface, used to describe the water vapor content in the air. |

The atmospheric absorption model is based on the Simple Satcom model. The calculation depends not only on the surface temperature $T$ and the water vapor density $\rho$ entered in the interface, but also on the signal frequency $f$, the local elevation angle $\theta$ of the propagation path, and other parameters. Atmospheric absorption can be written as "attenuation per unit path × effective atmospheric path length":

$$
L_{\mathrm{GA}}=\gamma\,L_{\mathrm{atm}}
$$

Here, $L_{\mathrm{GA}}$ is the atmospheric gas absorption loss, $\gamma$ is the specific attenuation determined by the frequency, temperature, and water vapor conditions, and $L_{\mathrm{atm}}$ is the propagation path length of the signal in the effective atmosphere.

The specific attenuation and the equivalent atmospheric height are calculated using frequency-dependent coefficients:

$$
\gamma=a+b\rho-cT
$$

$$
H_z=\alpha+\beta\rho+\zeta T
$$

$$
H=\frac{H_z}{\gamma}
$$

Here, $a$, $b$, $\alpha$, $\beta$, $\zeta$, and so on are model coefficients that vary with frequency. The exact values used in the equations are determined by logarithmic interpolation based on the transmitter frequency. The original value table is found in the data file gacoeffe.dat in the directory; $T$ is the surface air temperature, and $\rho$ is the surface water vapor density.

After the curvature of the Earth is taken into account, the effective atmospheric path length can be expressed as:

$$
L_{\mathrm{atm}}
=
\frac{2H}
{\sqrt{\sin^2\theta+\dfrac{2H}{R_e}}+\sin\theta}
$$

Here, $R_e$ is the equivalent Earth radius used by the model, and $\theta$ is the local elevation angle from the ground end to the space end. It follows that, other conditions being equal, a low-elevation link usually has a longer propagation path in the atmosphere, so the effect of atmospheric absorption is also more pronounced.

> **Note**: The Simple Satcom atmospheric absorption model is applicable to the frequency range of about $1\ \mathrm{GHz}$ to $350\ \mathrm{GHz}$; signals operating outside this range will have no attenuation. In addition, the corresponding attenuation is produced only when the signal propagation path actually passes through the atmosphere considered by the model (an altitude of 20 km to 100 km).

## Cloud, Rain, and Fog Attenuation Parameters

This includes the **rain model** and the **cloud and fog model**. The two groups of models describe the additional attenuation caused to a radio signal by rain and by cloud and fog media respectively.

### Rain Model

Rain attenuation is the signal attenuation caused by the absorption and scattering of electromagnetic waves by raindrops when a radio signal passes through a raining region. Rain attenuation usually increases as the communication frequency rises, and is related to factors such as the rainfall rate, the link elevation angle, the geographic location, and the polarization.

| Parameter | Description |
|---|---|
| Rain Model | When selected, rain attenuation calculation is enabled. When it is not selected, rain attenuation does not take part in the RF environment calculation. |
| Surface Temperature | The atmospheric temperature near the ground, which takes part in rain-environment-related calculations. |

A statistical rain attenuation calculation approach based on ITU-R recommendations is adopted. For a given geographic location, the model determines the rain attenuation per unit length from information such as the rainfall statistics, the communication frequency, the polarization, and the local elevation angle, and calculates the total rain attenuation together with the effective path length of the signal through the raining region.

Under the condition of $0.01\%$ of the year on average, the specific attenuation of rain can be written as:

$$
\gamma_R=kR_{0.01}^{\alpha}
$$

Here, $R_{0.01}$ is the rainfall rate exceeded for $0.01\%$ of the year, and $k$ and $\alpha$ are coefficients related to the frequency and the polarization.

After the horizontal and vertical corrections along the propagation path, the effective rain path length $L_E$ can be obtained, and the corresponding rain attenuation is:

$$
A_{0.01}=\gamma_R L_E
$$

Here, $A_{0.01}$ is the rain attenuation under the corresponding statistical condition, usually in dB.

> **Note**: The current ATK interface directly provides only the 【Surface Temperature】 parameter. The link frequency, propagation geometry, geographic location, and polarization required for the rain attenuation calculation are provided jointly by the communication objects, the chain, and the related models.

### Cloud and Fog Model

The cloud and fog model is used to describe the propagation attenuation produced when a radio signal passes through a cloud layer or fog layer containing liquid water droplets. Cloud and fog attenuation is mainly related to the operating frequency, the cloud layer temperature, the liquid water density, and the propagation distance of the signal in the cloud layer.

| Parameter | Description |
|---|---|
| Cloud and Fog Model | When selected, cloud and fog attenuation calculation is enabled. When it is not selected, this loss does not take part in the RF environment calculation. |
| Cloud Layer Top | The upper boundary parameter of the altitude range of the cloud layer, used to determine the spatial overlap between the signal and the cloud layer and the path length through the cloud. |
| Cloud Layer Thickness | The vertical thickness of the cloud or fog layer. The greater the thickness, the longer the distance over which the signal may propagate in the cloud and fog medium. |
| Cloud Layer Temperature | The temperature of the cloud and fog layer, used to determine the dielectric properties of liquid water and the specific attenuation coefficient. |
| Water Density | The liquid water content density in the cloud or fog layer. |

The specific attenuation caused by cloud and fog can be expressed as:

$$
\gamma_c=K_l M
$$

Here:

- $\gamma_c$ is the cloud and fog specific attenuation, in $\mathrm{dB/km}$;
- $K_l$ is the liquid water specific attenuation coefficient;
- $M$ is the liquid water density in the cloud or fog, in $\mathrm{g/m^3}$.

The liquid water specific attenuation coefficient is related to the signal frequency and the complex dielectric constant of liquid water:

$$
K_l
=
\frac{0.819f}
{\varepsilon''\left(1+\eta^2\right)}
$$

$$
\eta=\frac{2+\varepsilon'}{\varepsilon''}
$$

Here, $f$ is the frequency, and $\varepsilon'$ and $\varepsilon''$ are the real and imaginary parts of the complex dielectric constant of liquid water respectively, which vary with the frequency and the cloud layer temperature.

If the actual propagation path length of the signal in the cloud and fog layer is $L_c$, the cloud and fog propagation attenuation can be expressed as:

$$
A_c=\gamma_c L_c
$$

The propagation path length $L_c$ is determined jointly by the cloud layer altitude, the cloud layer thickness, and the local elevation angle of the link. At lower elevation angles, the slant path of the signal in the cloud layer is usually longer, so under otherwise identical conditions a greater cloud and fog attenuation may be produced.

> **Note**: The cloud layer top and the cloud layer thickness together determine the spatial extent of the cloud and fog layer. Only when the communication signal actually passes through this extent does the corresponding cloud and fog attenuation take part in the link loss calculation.

## RF Environment Loss and Communication Link Calculation

The propagation loss produced by the RF environment belongs to the additional transmission loss in the link budget. Let the free-space loss be $L_S$, and let the atmospheric absorption, rain attenuation, and cloud and fog attenuation be $L_{\mathrm{atm}}$, $L_{\mathrm{rain}}$, and $L_{\mathrm{cloud}}$ respectively; then the propagation-related loss can be written as:

$$
L_{\mathrm{prop}}
=
L_S+L_{\mathrm{atm}}+L_{\mathrm{rain}}+L_{\mathrm{cloud}}+L_{\mathrm{other}}
$$

Here, $L_{\mathrm{other}}$ represents the additional loss produced by polarization, feeders, or other models.

The received power can be expressed as:

$$
P_r
=
EIRP-L_S-L_{\mathrm{RF}}+G_r
$$

Here, $L_{\mathrm{RF}}$ represents the sum of the currently enabled RF environment and other propagation losses, and $G_r$ is the receiving antenna gain.

Therefore, after an RF environment model is enabled, the $C/N_0$, $C/N$, $E_b/N_0$, and bit error rate of the link may still change with the propagation environment and the link geometry even if the transmitter, receiver, and antenna parameters remain unchanged.
