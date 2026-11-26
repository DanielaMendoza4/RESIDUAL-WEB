"""Carga y resume el CSV de Agua en mi Cole para generar el sitio."""
from pathlib import Path

import pandas as pd


def cargar(ruta):
    datos = pd.read_csv(ruta, sep=";", encoding="utf-8-sig", dtype=str)
    datos.columns = datos.columns.str.strip().str.lower()
    for campo in datos.columns:
        datos[campo] = datos[campo].str.strip()
    for campo in ("clo_resid", "cumple_nor", "latitud", "longitud"):
        datos[campo] = pd.to_numeric(datos[campo], errors="raise")
    if datos.empty or datos.isna().any().any():
        raise ValueError("Revisa los campos vacíos del CSV antes de generar los gráficos.")
    if not datos["cumple_nor"].isin([0, 1]).all():
        raise ValueError("El indicador de cumplimiento debe contener solo 0 y 1.")
    return datos


def resumen(datos):
    return {
        "registros": len(datos),
        "provincias": datos["cod_prov"].nunique(),
        "distritos": datos["cod_dist"].nunique(),
        "cumplen": int(datos["cumple_nor"].sum()),
        "estados": {estado: int(total) for estado, total in datos["estado"].value_counts().items()},
        "desde": datos["periodo"].min(),
        "hasta": datos["periodo"].max(),
        "corte": datos["fechacorte"].max(),
    }


if __name__ == "__main__":
    import argparse
    import json

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("csv", type=Path)
    args = parser.parse_args()
    destino = Path(__file__).resolve().parents[1] / "src/data/monitoreo.json"
    destino.write_text(json.dumps(resumen(cargar(args.csv)), indent=2) + "\n", encoding="utf-8")
