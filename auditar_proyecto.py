#!/usr/bin/env python3
from __future__ import annotations
import json, re, sys
from collections import Counter
from pathlib import Path
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent
INDEX = ROOT / "index.html"
INVENTORY = ROOT / "inventario_maestro.json"

errors=[]; warnings=[]; passed=[]

def ok(msg): passed.append(msg)
def fail(msg): errors.append(msg)
def warn(msg): warnings.append(msg)

if not INDEX.exists(): fail("Falta index.html")
if not INVENTORY.exists(): fail("Falta inventario_maestro.json")

if not errors:
    html=INDEX.read_text(encoding="utf-8")
    soup=BeautifulSoup(html,"html.parser")
    ids=[n.get("id") for n in soup.find_all(attrs={"id":True})]
    dup=[k for k,v in Counter(ids).items() if v>1]
    if dup: fail("IDs HTML duplicados: "+", ".join(dup))
    else: ok(f"IDs HTML únicos: {len(ids)}")

    inv=json.loads(INVENTORY.read_text(encoding="utf-8"))
    modules=inv["modules"]
    nav={n.get("data-page") for n in soup.select("[data-page]") if n.get("data-page")}
    missing_nav=[]; missing_page=[]
    for m in modules:
        mid=m["id"]
        if mid not in nav: missing_nav.append(mid)
        if soup.find(id=mid) is None: missing_page.append(mid)
    if missing_nav: fail("Módulos sin acceso de menú: "+", ".join(missing_nav))
    else: ok(f"Accesos de menú presentes: {len(modules)}")
    if missing_page: fail("Módulos sin contenedor de página: "+", ".join(missing_page))
    else: ok(f"Contenedores de página presentes: {len(modules)}")

    required=["devcalculator","toolviews","machineTwin","program2d","program3d","sim2d","sim3d","validation","projectcenter"]
    absent=[x for x in required if soup.find(id=x) is None]
    if absent: fail("Núcleo acumulativo incompleto: "+", ".join(absent))
    else: ok("Núcleo acumulativo prioritario conservado")

    if "pp571DeployBadge" in html or "GITHUB FIX</div>" in html:
        fail("Sigue presente el banner visible de despliegue")
    else: ok("Interfaz sin banner visible de despliegue")

    if re.search(r"PLEGAR_PRO_BUILD=\{version:'61\.0'", html): ok("Build interno actualizado a 61.0")
    else: fail("Build interno no actualizado a 61.0")

    # Lightweight wiring checks
    for token in ["openPage", "localStorage", "tvCanvas3D", "devcalculator", "sim3d", "v600ReleaseCard", "PlegarProRelease"]:
        if token not in html and token not in (ROOT/"app.js").read_text(encoding="utf-8"):
            fail(f"Referencia funcional esencial ausente: {token}")
        else: ok(f"Referencia funcional localizada: {token}")

report={"version":"61.0","passed":passed,"warnings":warnings,"errors":errors,"result":"PASS" if not errors else "FAIL"}
(ROOT/"AUDITORIA_v60_0.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps(report,ensure_ascii=False,indent=2))
sys.exit(1 if errors else 0)
