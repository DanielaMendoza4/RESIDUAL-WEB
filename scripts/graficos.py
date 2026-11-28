"""Exporta los diez gráficos de contexto con Matplotlib."""
import argparse
from pathlib import Path
from textwrap import fill

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
import pandas as pd

from monitoreo import cargar

ROOT = Path(__file__).resolve().parents[1]
TINTA = "#e8ece3"
MUTED = "#aeb5a6"
FONDO = "#1a1e18"
LIMA = "#c4f65a"
COLORES = {"CRITICO": "#ff8879", "DEFICIENTE": "#e6bd6e", "OPTIMO": LIMA, "ALTO": "#bbadfa"}
AZUL = "#67a9ff"
TURQUESA = "#55b8a8"
ROJO = "#ef6a67"
AMARILLO = "#e6bd6e"
ETIQUETAS = {"CRITICO": "Crítico", "DEFICIENTE": "Deficiente", "OPTIMO": "Óptimo", "ALTO": "Alto"}

plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 12, "figure.facecolor": FONDO,
    "axes.facecolor": FONDO, "axes.labelcolor": MUTED, "text.color": TINTA,
    "xtick.color": MUTED, "ytick.color": MUTED, "axes.spines.top": False,
    "axes.spines.right": False, "axes.spines.left": False, "axes.spines.bottom": False,
    "legend.labelcolor": TINTA, "legend.frameon": False, "legend.fontsize": 10,
    "grid.color": "#777e70", "grid.alpha": 0.27, "axes.axisbelow": True,
})


def figura():
    return plt.subplots(figsize=(8.4, 4.8), layout="constrained")


def guardar(fig, destino, nombre):
    fig.savefig(destino / f"{nombre}.png", dpi=150)
    plt.close(fig)


def color_por_valor(valor, minimo, maximo):
    posicion = (valor - minimo) / (maximo - minimo) if maximo > minimo else 1
    if posicion < .33:
        return ROJO
    if posicion < .67:
        return AMARILLO
    return LIMA


def barras_horizontales(serie, etiqueta, color=AZUL):
    fig, ax = figura()
    barras = ax.barh([fill(str(v), width=25) for v in serie.index], serie.values, color=color)
    ax.bar_label(barras, padding=5, color=TINTA, fontsize=10)
    ax.set(xlabel=etiqueta, xlim=(0, serie.max() * 1.23))
    ax.grid(axis="x")
    return fig


def principal():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("csv", type=Path)
    argumentos = parser.parse_args()
    datos = cargar(argumentos.csv)
    destino = ROOT / "public/graficos"
    destino.mkdir(parents=True, exist_ok=True)
    estados = datos["estado"].value_counts().reindex(COLORES, fill_value=0)
    mensual = datos.groupby("periodo").agg(
        promedio=("clo_resid", "mean"), tasa=("cumple_nor", "mean")
    )
    provincias = datos.groupby("nom_prov")
    conteo = provincias.size()
    prestadores = datos.groupby("prestador").agg(
        cantidad=("clo_resid", "size"), tasa=("cumple_nor", "mean")
    ).nlargest(7, "cantidad").sort_values("tasa")

    fig, ax = figura()
    ax.pie(estados, colors=list(COLORES.values()), startangle=90,
           wedgeprops={"width": .24, "edgecolor": FONDO, "linewidth": 2})
    ax.text(0, .06, f"{len(datos):,}".replace(",", " "), ha="center", va="center",
            size=32, weight="bold")
    ax.text(0, -.14, "registros", color=MUTED, ha="center", va="center")
    ax.legend([f"{ETIQUETAS[k]} · {n / len(datos):.1%}" for k, n in estados.items()],
              loc="center left", bbox_to_anchor=(.98, .5))
    guardar(fig, destino, "estados")

    for campo, nombre, etiqueta in (
        ("promedio", "cloro-mensual", "Cloro residual promedio"),
        ("tasa", "cumplimiento-mensual", "Cumplimiento registrado"),
    ):
        fig, ax = figura()
        color = AZUL if campo == "promedio" else AMARILLO
        ax.plot(range(len(mensual)), mensual[campo], color=color, linewidth=2.5, marker="o", markersize=4)
        marcas = sorted(set(range(0, len(mensual), 4)) | {len(mensual) - 1})
        ax.set(xticks=marcas, xticklabels=mensual.index[marcas], xlabel="Periodo", ylabel=etiqueta)
        ax.set_ylim(bottom=0)
        ax.grid(axis="y")
        if campo == "tasa":
            ax.set_ylim(0, 1)
            ax.yaxis.set_major_formatter(mticker.PercentFormatter(1, decimals=0))
        guardar(fig, destino, nombre)

    guardar(barras_horizontales(conteo.sort_values(), "Registros de monitoreo"),
            destino, "registros-provincia")

    fig, ax = figura()
    medias = provincias["clo_resid"].mean().sort_values(ascending=False)
    colores = [color_por_valor(valor, medias.min(), medias.max()) for valor in medias]
    barras = ax.bar(medias.index, medias, color=colores)
    ax.bar_label(barras, fmt="%.2f", color=TINTA, padding=5, fontsize=10)
    ax.set(ylabel="Cloro residual promedio", ylim=(0, medias.max() * 1.2))
    plt.setp(ax.get_xticklabels(), rotation=32, ha="right")
    ax.grid(axis="y")
    guardar(fig, destino, "cloro-provincia")

    fig, ax = figura()
    nombres = [fill(f"{nombre} (n={fila.cantidad:.0f})", 28) for nombre, fila in prestadores.iterrows()]
    colores = [color_por_valor(valor, prestadores["tasa"].min(), prestadores["tasa"].max()) for valor in prestadores["tasa"]]
    barras = ax.barh(nombres, prestadores["tasa"], color=colores)
    ax.bar_label(barras, labels=[f"{v:.1%}" for v in prestadores["tasa"]], color=TINTA, padding=5, fontsize=10)
    ax.set(xlabel="Cumplimiento registrado", xlim=(0, 1.12), xticks=[0, .25, .5, .75, 1])
    ax.xaxis.set_major_formatter(mticker.PercentFormatter(1, decimals=0))
    ax.grid(axis="x")
    guardar(fig, destino, "cumplimiento-prestador")

    fig, ax = figura()
    puntos = datos.groupby(["longitud", "latitud"], as_index=False)["clo_resid"].mean()
    imagen = ax.scatter(puntos["longitud"], puntos["latitud"], c=puntos["clo_resid"], cmap="RdYlGn",
                        s=40, linewidths=.5, edgecolors=TINTA)
    fig.colorbar(imagen, ax=ax).set_label("Cloro residual promedio")
    ax.set(xlabel="Longitud", ylabel="Latitud")
    ax.ticklabel_format(useOffset=False)
    ax.grid()
    guardar(fig, destino, "puntos-monitoreados")

    fig, ax = figura()
    conteos, bordes, parches = ax.hist(datos["clo_resid"], bins=18, edgecolor=FONDO)
    centros = (bordes[:-1] + bordes[1:]) / 2
    for parche, centro in zip(parches, centros):
        parche.set_facecolor(color_por_valor(centro, bordes.min(), bordes.max()))
    ax.set(xlabel="Cloro residual", ylabel="Registros")
    ax.grid(axis="y")
    guardar(fig, destino, "distribucion-cloro")

    fig, ax = figura()
    cruzada = pd.crosstab(datos["nom_prov"], datos["estado"]).reindex(columns=COLORES, fill_value=0)
    cruzada.plot.bar(stacked=True, color=list(COLORES.values()), ax=ax, width=.65)
    ax.legend([ETIQUETAS[k] for k in COLORES], loc="lower left", bbox_to_anchor=(0, 1), ncol=4)
    ax.set(xlabel="", ylabel="Registros de monitoreo")
    plt.setp(ax.get_xticklabels(), rotation=32, ha="right")
    ax.grid(axis="y")
    guardar(fig, destino, "estados-provincia")

    distritos = datos.loc[datos["estado"].eq("CRITICO")].groupby("nom_dist").size().nlargest(10).sort_values()
    guardar(barras_horizontales(distritos, "Registros en estado crítico", COLORES["CRITICO"]),
            destino, "criticos-distrito")


if __name__ == "__main__":
    principal()
