import os
from PIL import Image

src_dir = r"c:\Users\corne\Documents\stage\website improvements\site clone simular small fixes\afbeelingen"
files = ["background.webp", "spies.webp", "meisje_laptop.webp", "meisje_schuin.webp", "helicopter.webp"]

for f in files:
    path = os.path.join(src_dir, f)
    if os.path.exists(path):
        img = Image.open(path)
        print(f"{f}: mode={img.mode}, size={img.size}")
    else:
        print(f"{f} not found")
