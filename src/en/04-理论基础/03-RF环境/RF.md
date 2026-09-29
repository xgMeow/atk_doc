# RF Environment

## 1. Role of the RF Environment in a Communication Link

When a radio signal propagates from the transmitting end to the receiving end, in addition to the basic propagation loss caused by free-space spreading, it is also affected by propagation media such as atmospheric gases, rain, clouds, and fog.

From the perspective of the link budget, the RF environment model occupies the propagation channel part of "transmitting end — propagation channel — receiving end". For a direct communication link, the main computational relationships can be summarized as:

$$
\mathrm{EIRP}
\rightarrow
L_S
\rightarrow
L_{\mathrm{RF}}
\rightarrow
P_r
\rightarrow
G/T
\rightarrow
C/N_0
\rightarrow
C/N
\rightarrow
E_b/N_0
\rightarrow
\mathrm{BER}
$$

where the free-space loss is

$$
L_S
=
10\log_{10}
\left[
\left(\frac{4\pi Rf}{c}\right)^2
\right]
$$

where:

- $R$ is the distance between the transmitting end and the receiving end;
- $f$ is the operating frequency;
- $c$ is the speed of light.

The equivalent isotropically radiated power of the transmitting end is

$$
\mathrm{EIRP}=P_t+G_t-L_{tf}
$$

where $P_t$ is the transmit power, $G_t$ is the transmit antenna gain, and $L_{tf}$ is the feed loss at the transmitting end.

After accounting for the propagation environment, the received signal power can be written as

$$
P_r
=
\mathrm{EIRP}
-L_S
-L_{\mathrm{other}}
+G_r
$$

where $G_r$ is the receive antenna gain, and $L_{\mathrm{other}}$ denotes the additional transmission loss beyond free-space loss. The atmospheric absorption, rain attenuation, and cloud and fog attenuation caused by the RF environment all belong to this part of the additional propagation loss.

Therefore, the RF environment loss can be written separately as

$$
L_{\mathrm{RF}}
=
L_{\mathrm{atm}}
+L_{\mathrm{rain/cloud}}
$$

where:

- $L_{\mathrm{atm}}$ is the atmospheric gas absorption loss;
- $L_{\mathrm{rain/cloud}}$ is the additional attenuation produced by rain or cloud and fog.

ATK explicitly divides the RF environment loss into **rain attenuation loss, atmospheric absorption loss, and cloud and fog loss**: atmospheric absorption can be used as an independent loss term, whereas the rain model and the cloud and fog model are two options within the same group of environment models.

The RF environment may not only reduce the received signal power, but may also increase the external noise temperature of the receiving system. ATK treats environmental noise such as atmosphere, rain, cloud, and fog as part of the external noise of the receiving system; therefore the RF environment ultimately affects link quality in both directions: "propagation loss" and "noise temperature".

---

## 2. Sources of the Parameters of the RF Environment Model

The RF environment calculation does not use only the parameters entered directly on the RF environment page. The parameters required for a complete calculation usually come from three parts:

1. **RF environment interface parameters**: for example surface temperature, water vapor density, cloud ceiling, cloud thickness, cloud temperature, and liquid water density;
2. **Communication object parameters**: for example transmit frequency, polarization, and the geographic location and altitude of the parent objects of the transmitter and receiver;
3. **Propagation geometry parameters**: for example the distance between the transmitting end and the receiving end, the local elevation angle of the facility, and the actual path length of the signal through the atmosphere or cloud layer.

Therefore, an RF environment model can be expressed as

$$
L_{\mathrm{RF}}
=
F
\left(
\text{environment parameters},
\text{frequency},
\text{polarization},
\text{geographic location},
\text{propagation geometry}
\right)
$$

---

## 3. Atmospheric Absorption

### 3.1 Physical Meaning

Atmospheric absorption describes the propagation attenuation produced when a radio signal passes through the Earth's atmosphere, caused by atmospheric constituents such as oxygen and water vapor absorbing electromagnetic energy.

Its characteristics are:

- It is related to the **operating frequency**;
- It is related to the **air temperature near the surface**;
- It is related to the **water vapor content**;
- It is related to the **slant path length** over which the signal passes through the atmosphere;
- Therefore it is also related to the **local elevation angle** of the link.

The **Simple Satcom Model** is used to describe atmospheric absorption.

### 3.2 Applicable Conditions of the Model

The applicable frequency range of the ATK Simple Satcom model is approximately

$$
1\ \mathrm{GHz}
\leq f\leq
350\ \mathrm{GHz}.
$$

The model takes effect only when the following conditions hold:

1. The atmospheric absorption model has been enabled;
2. The propagation path between the transmitting end and the receiving end actually passes through the atmosphere considered by the model.

This model is related to the atmospheric altitude range of $20\ \mathrm{km}$ to $100\ \mathrm{km}$. In essence, it is not that "all communication links are given a fixed additional atmospheric loss"; rather, it first determines whether the signal path passes through the valid atmospheric region, and then calculates the actual slant path absorption loss.

### 3.3 Input Parameters and Their Sources

| Parameter | Symbol | Source | Role |
|---|---:|---|---|
| Surface temperature | $T$ | RF environment | Describes the near-ground air temperature |
| Water vapor density | $\rho$ | RF environment | Describes the near-ground water vapor concentration |
| Operating frequency | $f$ | Transmitter/communication signal | Determines the coefficients of the atmospheric absorption model |
| Local elevation angle | $\theta$ | Link geometry | Determines the slant path length of the signal through the atmosphere |
| Frequency-related coefficients | $a,b,\alpha,\beta,\zeta$ | Model data table | Obtained by interpolation according to frequency |

The frequency-related coefficients are determined by logarithmic interpolation on the transmitter frequency, and the original coefficient table comes from the model data file.

### 3.4 Specific Attenuation and Equivalent Atmospheric Height

The Simple Satcom model first determines the specific attenuation parameters from the surface temperature and the water vapor density:

$$
\gamma
=
a+b\rho-cT
$$

It also computes

$$
H_z
=
\alpha+\beta\rho+\zeta T
$$

and the equivalent atmospheric height

$$
H
=
\frac{H_z}{\gamma}.
$$

where:

- $a$, $b$, $c$, $\alpha$, $\beta$ and $\zeta$ are all frequency-related model coefficients.
- $\gamma$ describes the gas absorption strength per unit effective propagation distance;
- $H$ describes the effective height that can be used to equivalently represent the actual vertical distribution of the atmosphere;
- Temperature, water vapor, and operating frequency jointly determine "how strong the absorption is per unit distance";
- The elevation angle further determines "how long an atmospheric path the signal actually traverses".

### 3.5 Effective Atmospheric Slant Path

For an Earth-space link with local elevation angle $\theta$, if only the plane-parallel atmosphere approximation is used, the path length increases rapidly as $1/\sin\theta$ at low elevation angles. The Simple Satcom model further takes the Earth's curvature into account, so the effective path can be written as

$$
L_{\mathrm{atm}}
=
\frac{2H}
{
\sqrt{\sin^2\theta+\dfrac{2H}{R_e}}
+\sin\theta
},
$$

where $R_e$ is the equivalent Earth radius used by the model, on the order of about $8500\ \mathrm{km}$.

From this, the atmospheric gas absorption loss can be understood as

$$
L_{\mathrm{GA}}
=
\gamma L_{\mathrm{atm}}.
$$

### 3.6 Why Atmospheric Absorption Is More Pronounced at Low Elevation Angles

When $\theta$ is relatively large, the signal passes through the atmosphere nearly vertically and the propagation distance is short; when $\theta$ decreases, the signal propagates obliquely along the atmosphere and its path through the atmosphere grows significantly. Therefore, with other parameters unchanged:

$$
\theta\downarrow
\quad\Longrightarrow\quad
L_{\mathrm{atm}}\uparrow
\quad\Longrightarrow\quad
L_{\mathrm{GA}}\uparrow.
$$

This is one of the reasons why a communication system is usually more susceptible to atmospheric propagation effects at low elevation angles near the horizon.

### 3.7 Atmospheric Absorption and Noise Temperature

ATK not only treats atmospheric absorption as a signal loss, but also introduces atmospheric radiation into the external noise temperature of the receiving system. If the linear quantity of the atmospheric loss is $L_a$, the atmospheric noise temperature can be estimated as

$$
T_{at}
=
\left(1-\frac{1}{L_a}\right)T_0,
$$

where $T_0$ is the atmospheric physical temperature, generally taken as about $290\ \mathrm K$ in reports.

Therefore, the atmospheric environment has a twofold effect on receiving performance:

1. **It reduces the received carrier power**;
2. **It raises the equivalent noise temperature of the receiving system**.

In the end, both reduce the $C/N_0$ and $E_b/N_0$ of the link.

---

## 4. Rain Attenuation

### 4.1 Physical Meaning

Rain attenuation is the additional propagation attenuation caused by the absorption and scattering of electromagnetic waves by raindrops when a radio signal passes through a raining region.

Rain attenuation is not determined only by "whether it is raining", but is related to the following factors at the same time:

- Rain rate;
- Operating frequency;
- Signal polarization;
- Location of the facility;
- Facility altitude;
- Rain layer height;
- Earth-space link elevation angle;
- Effective propagation path of the signal within the raining region.

ATK adopts the statistical rain attenuation calculation approach of the ITU-R series of Recommendations. In terms of formulas and steps, the complete chain is:

$$
\boxed{\text{rain height}}
\rightarrow
\boxed{\text{rain region path}}
\rightarrow
\boxed{R_{0.01}}
\rightarrow
\boxed{\gamma_R}
\rightarrow
\boxed{\text{path correction}}
\rightarrow
\boxed{L_E}
\rightarrow
\boxed{A_{0.01}}
$$

where:

- ITU-R P.839 is used to obtain the rain height;
- ITU-R P.837 can be used to obtain the local rainfall statistics $R_{0.01}$;
- ITU-R P.838 gives the frequency- and polarization-dependent specific attenuation coefficients;
- The path reduction and vertical correction formulas are consistent with the Earth-space rain attenuation prediction procedure of ITU-R P.618.

### 4.2 Meaning of the $0.01\%$ Time Statistic

$R_{0.01}$ denotes the rain rate exceeded for only about $0.01\%$ of the time in an average year, usually expressed in $\mathrm{mm/h}$. It is a long-term statistic describing relatively strong rainfall conditions.

The rain attenuation model first calculates the attenuation $A_{0.01}$ under this statistical condition, thereby describing the long-term availability level of a communication system in a relatively severe rain environment.

### 4.3 Parameters Required for the Rain Attenuation Calculation

| Parameter | Symbol | Typical Source |
|---|---:|---|
| Annual mean rain height | $h_R$ | ITU-R P.839 data |
| Rain height reference value | $h_0$ | ITU-R P.839 data |
| Facility altitude | $h_s$ | Facility object |
| Facility latitude | $\varphi$ | Facility object |
| Earth-space link elevation angle | $\theta$ | Link geometry |
| Operating frequency | $f$ | Transmitter |
| Polarization | — | Transmitter/receiver antenna |
| $0.01\%$ annual rain rate | $R_{0.01}$ | Local statistics or ITU-R P.837 |
| Effective Earth radius | $R_e$ | Model constant |

### 4.4 Step 1: Determine the Rain Height

The rain height is

$$
h_R=h_0+0.36\ \mathrm{km},
$$

where $h_0$ is obtained from ITU-R P.839 data.

$h_R$ can be understood as the altitude of the upper boundary of the liquid rain layer. The facility altitude is $h_s$, so $h_R-h_s$ represents the vertical height difference from the facility to the upper boundary of the rain layer.

### 4.5 Step 2: Calculate the Slant Path Through the Rain Layer

When the elevation angle is

$$
\theta\geq5^\circ
$$

the following is used:

$$
L_s
=
\frac{h_R-h_s}{\sin\theta}.
$$

When

$$
\theta<5^\circ
$$

the Earth's curvature must be taken into account:

$$
L_s
=
\frac{2(h_R-h_s)}
{
\sqrt{\sin^2\theta+\dfrac{2(h_R-h_s)}{R_e}}
+\sin\theta
}.
$$

The curvature correction is used for low-elevation links because the error of the simple plane geometry approximation becomes significantly larger in that case.

### 4.6 Step 3: Calculate the Horizontal Projection Distance

The horizontal projection of the slant path on the ground is

$$
L_G=L_s\cos\theta.
$$

$L_G$ is subsequently used to correct the spatial non-uniformity of the raining region.

### 4.7 Step 4: Obtain the Rain Rate $R_{0.01}$

The model uses the 1 min integration time rain rate $R_{0.01}$ exceeded for $0.01\%$ of an average year.

If no long-term rainfall statistics are available locally, an estimate can be obtained from the rain rate data of ITU-R P.837. If

$$
R_{0.01}=0,
$$

the model considers that the rain attenuation calculation need not continue, and the corresponding rain attenuation is zero.

### 4.8 Step 5: Calculate the Specific Attenuation of Rain

The specific attenuation of rain is

$$
\gamma_R
=
kR_{0.01}^{\alpha}
\qquad(\mathrm{dB/km}),
$$

where:

- $k$ and $\alpha$ are frequency- and polarization-related coefficients;
- $R_{0.01}$ is the rain rate.

Two important rules:

1. At the same rain rate, the rain attenuation differs for different frequencies;
2. At the same frequency, the rain attenuation also differs for different polarizations.

### 4.9 Step 6: Horizontal Path Reduction

Actual rainfall is usually not uniformly distributed along the entire geometric path, so a horizontal reduction factor $r_{0.01}$ must be introduced:

$$
r_{0.01}
=
\frac{1}
{
1+0.78
\sqrt{
\frac{L_G\gamma_R}{f}
-0.38\left(1-e^{-2L_G}\right)
}
}.
$$

This coefficient is used to correct the geometric path into an effective path that better matches the spatial statistics of rainfall.

### 4.10 Step 7: Vertical Path Correction

First compute

$$
\zeta
=
\tan^{-1}
\left(
\frac{h_R-h_s}
{L_G r_{0.01}}
\right).
$$

If

$$
\zeta>\theta,
$$

then

$$
L_R
=
\frac{L_G r_{0.01}}{\cos\theta};
$$

otherwise

$$
L_R
=
\frac{h_R-h_s}{\sin\theta}.
$$

Then, according to the facility latitude, compute

$$
\chi=
\begin{cases}
36-|\varphi|, & |\varphi|<36^\circ,\\
0, & |\varphi|\geq36^\circ.
\end{cases}
$$

The vertical correction coefficient is

$$
v_{0.01}
=
\frac{1}
{
1+
\sqrt{\sin\theta}
\left[
31
\left(1-e^{-\theta/(1+\chi)}\right)
\frac{\sqrt{L_R\gamma_R}}{f^2}
-0.45
\right]
}.
$$

### 4.11 Step 8: Effective Rain Region Path and Final Rain Attenuation

The effective path length is

$$
L_E=L_Rv_{0.01}.
$$

Therefore, the predicted rain attenuation exceeded for $0.01\%$ of an average year is

$$
A_{0.01}
=
\gamma_RL_E
\qquad(\mathrm{dB}).
$$

The whole calculation process is:

> First determine "how high the rain layer is" from the geographic location, then determine "how far the signal geometrically traverses the rain layer" from the link elevation angle, then determine "how large the attenuation is per unit distance" from the rainfall statistics, frequency, and polarization, and finally obtain the "truly effective rain region path" through horizontal and vertical reduction.

## 5. Cloud and Fog Attenuation

### 5.1 Physical Meaning

Cloud and fog mainly consist of fine liquid water droplets suspended in the air. When radio waves pass through these droplets, absorption and scattering occur, resulting in propagation attenuation.

Cloud and fog attenuation is mainly determined by the following factors:

- Operating frequency $f$;
- Cloud and fog temperature $T$;
- Liquid water density $M$;
- Actual propagation path length $L_c$ of the signal in the cloud and fog medium.

Therefore, the core relationships can be summarized as

$$
\boxed{
\text{frequency, temperature}
\rightarrow
K_l
}
\qquad
\boxed{
K_l,M
\rightarrow
\gamma_c
}
\qquad
\boxed{
\gamma_c,L_c
\rightarrow
A_c
}.
$$

### 5.2 Specific Attenuation of Cloud and Fog

The specific attenuation in cloud and fog is

$$
\gamma_c
=
K_lM
\qquad(\mathrm{dB/km}),
$$

where:

- $\gamma_c$ is the specific attenuation in the cloud and fog medium;
- $K_l$ is the specific attenuation coefficient per unit liquid water content;
- $M$ is the liquid water density in cloud or fog, in $\mathrm{g/m^3}$.

Therefore, when the frequency and temperature are unchanged:

$$
M\uparrow
\quad\Longrightarrow\quad
\gamma_c\uparrow.
$$

The liquid water density of moderate fog is about $0.05\ \mathrm{g/m^3}$, and that of dense fog can reach about $0.5\ \mathrm{g/m^3}$.

### 5.3 Liquid Water Specific Attenuation Coefficient

Based on Rayleigh scattering and the double-Debye dielectric model of water, the liquid water specific attenuation coefficient can be written as

$$
K_l
=
\frac{0.819f}
{\varepsilon''\left(1+\eta^2\right)},
$$

where $f$ is in GHz, and

$$
\eta
=
\frac{2+\varepsilon'}{\varepsilon''}.
$$

$\varepsilon'$ and $\varepsilon''$ are the real and imaginary parts of the complex permittivity of water, respectively.

The double-Debye expression given by the model report is

$$
\varepsilon''(f)
=
\frac{f(\varepsilon_0-\varepsilon_1)}
{f_p\left[1+(f/f_p)^2\right]}
+
\frac{f(\varepsilon_1-\varepsilon_2)}
{f_s\left[1+(f/f_s)^2\right]},
$$

$$
\varepsilon'(f)
=
\frac{\varepsilon_0-\varepsilon_1}
{1+(f/f_p)^2}
+
\frac{\varepsilon_1-\varepsilon_2}
{1+(f/f_s)^2}
+\varepsilon_2.
$$

where

$$
\Theta=\frac{300}{T},
$$

$$
\varepsilon_0
=
77.6+103.3(\Theta-1),
$$

$$
\varepsilon_1
=
0.0671\varepsilon_0,
$$

$$
\varepsilon_2
=
3.52,
$$

the primary relaxation frequency is

$$
f_p
=
20.09
-146(\Theta-1)
+316(\Theta-1)^2,
$$

and the secondary relaxation frequency is

$$
f_s=39.8f_p.
$$

Here $T$ is the absolute temperature of liquid water, in K.

It can be seen that the cloud and fog temperature is not simply added as an "empirical correction"; instead, it first changes the dielectric properties of liquid water, then changes $K_l$, and finally changes the cloud and fog specific attenuation $\gamma_c$.

### 5.4 Statistical Cloud Liquid Water Path Model

In statistical models of the ITU-R P.840 type, if the total cloud liquid water content $L_{red}$ at a location is known, the slant path cloud attenuation can be expressed as

$$
A
=
\frac{L_{red}K_l}{\sin\theta},
$$

where:

- $L_{red}$ is the total cloud liquid water content of the atmospheric column;
- $K_l$ is the specific attenuation coefficient per unit liquid water;
- $\theta$ is the link elevation angle.

### 5.5 Cloud and Fog Model

| Interface Parameter | Theoretical Role |
|---|---|
| Cloud ceiling | Determines the altitude range in which the cloud layer lies, and participates in determining whether the signal passes through the cloud and the length of the path through the cloud |
| Cloud thickness | Determines the position of the other boundary of the cloud layer, and thus determines $L_c$ |
| Cloud temperature | After conversion to absolute temperature, participates in the calculation of the liquid water permittivity, the relaxation frequencies, and $K_l$ |
| Water density | Corresponds to the liquid water density $M$, and directly participates in $\gamma_c=K_lM$ |

Therefore, the calculation approach is:

1. Determine the spatial range of the cloud layer from the cloud altitude and thickness;
2. Determine whether the signal passes through the cloud layer from the positions of the transmitting end and the receiving end and the local elevation angle;
3. Calculate the actual slant path length $L_c$ of the signal in the cloud layer;
4. Calculate $K_l$ from the frequency and temperature;
5. Calculate $\gamma_c=K_lM$ from $M$;
6. Finally obtain

$$
A_c=\gamma_cL_c.
$$

> **The cloud and fog itself determines how much attenuation occurs per kilometer, and the propagation geometry determines how many kilometers are actually traversed.**

### 5.6 Cloud Layer Slant Path Length

Different path formulas are used for high and low elevation angles.

When

$$
\theta>5^\circ
$$

for a given altitude boundary $H$, the following approximation can be used:

$$
dL(H)
=
\frac{H}{\sin\theta}.
$$

When

$$
\theta\leq5^\circ
$$

the Earth's curvature is taken into account:

$$
dL(H)
=
\frac{2H}
{
\sqrt{\sin^2\theta+\dfrac{2H}{R_e}}
+\sin\theta
}.
$$

If the slant path distances corresponding to the two boundaries of the cloud layer are $dL_u$ and $dL_l$ respectively, the length over which the signal actually passes through the cloud layer can be obtained from their difference:

$$
L_c
=
|dL_u-dL_l|.
$$

Finally:

$$
A_c
=
K_lM L_c.
$$

## 6. RF Environment and Receiving System Noise Temperature

The RF environment affects not only the propagation loss, but also the external noise temperature at the receiving end.

ATK writes the external noise temperature of the receiving system as

$$
T_a
=
\frac{T_{sk}}{L_a}
+T_{at}
+T_{sl},
$$

where:

- $T_{sk}$ is the sky background noise temperature;
- $L_a$ is the linear quantity of the atmospheric loss;
- $T_{at}$ is the atmospheric noise temperature;
- $T_{sl}$ is the sidelobe noise temperature.

The atmospheric noise temperature is

$$
T_{at}
=
\left(1-\frac{1}{L_a}\right)T_0.
$$

The rain environment noise temperature can be estimated as

$$
T_{ar}
=
\left(1-\frac{1}{L_{ar}}\right)T_0.
$$

When the loss caused by the RF environment increases, the receiving system not only receives a weaker desired signal, but may also receive a higher environmental noise contribution.

The gain-to-noise-temperature ratio at the receiving end is

$$
\frac{G}{T}
=
\frac{G_r}{T_n},
$$

and when expressed in decibels it is

$$
G/T
=
G_r-10\log_{10}T_n.
$$

Therefore, the degradation of the RF environment may simultaneously cause:

$$
P_r\downarrow,
\qquad
T_n\uparrow,
\qquad
G/T\downarrow.
$$

This further leads to

$$
C/N_0\downarrow,
\qquad
E_b/N_0\downarrow,
\qquad
\mathrm{BER}\uparrow.
$$

---

## 7. Differences Among the Three Types of RF Environment Models

| Model | Main Physical Mechanism | Main Parameters | Geometric Influence | Output |
|---|---|---|---|---|
| Atmospheric absorption | Absorption by gas molecules such as oxygen and water vapor | Frequency, surface temperature, water vapor density | Atmospheric slant path length, elevation angle | Atmospheric gas absorption loss |
| Rain attenuation | Absorption and scattering by raindrops | Rain rate, frequency, polarization, location | Slant path in the raining region, elevation angle | Statistical rain attenuation $A_{0.01}$ |
| Cloud and fog attenuation | Absorption and scattering by cloud and fog liquid water droplets | Frequency, cloud temperature, liquid water density | Path through the cloud, elevation angle | Cloud and fog attenuation $A_c$ |

From the point of view of use, these three types of models answer:

- **Atmospheric absorption**: how much attenuation the ordinary atmospheric gases themselves cause even without rain and cloud or fog;
- **Rain attenuation**: how much link attenuation strong rainfall conditions may cause in the long-term statistical sense;
- **Cloud and fog attenuation**: how much attenuation is produced when the signal actually passes through a cloud or fog layer of a certain altitude, thickness, and liquid water density.

---

## 10. Summary of Main Symbols

| Symbol | Meaning | Common Unit |
|---|---|---|
| $f$ | Operating frequency | GHz or Hz |
| $R$ | Distance between the transmitting end and the receiving end | m or km |
| $\theta$ | Local elevation angle | deg or rad |
| $T$ | Surface air temperature or cloud liquid water temperature | $^\circ$C or K |
| $\rho$ | Surface water vapor density | $\mathrm{g/m^3}$ |
| $M$ | Cloud and fog liquid water density | $\mathrm{g/m^3}$ |
| $L_S$ | Free-space loss | dB |
| $L_{GA}$ | Atmospheric gas absorption loss | dB |
| $\gamma$ | Quantity related to atmospheric specific attenuation | dB/km (as defined by the model) |
| $h_R$ | Rain height | km |
| $h_s$ | Facility altitude | km |
| $R_{0.01}$ | Rain rate exceeded for $0.01\%$ of an average year | mm/h |
| $\gamma_R$ | Specific attenuation of rain | dB/km |
| $A_{0.01}$ | Rain attenuation exceeded for $0.01\%$ of an average year | dB |
| $K_l$ | Cloud liquid water specific attenuation coefficient | $(\mathrm{dB/km})/(\mathrm{g/m^3})$ |
| $\gamma_c$ | Cloud and fog specific attenuation | dB/km |
| $L_c$ | Propagation path length of the signal in the cloud and fog layer | km |
| $A_c$ | Total cloud and fog attenuation | dB |
| $T_a$ | External noise temperature of the receiving system | K |
| $T_n$ | Total equivalent noise temperature of the receiving system | K |
| $G/T$ | Gain-to-noise-temperature ratio at the receiving end | dB/K |

---
