import os
from PIL import Image

src_dir = r"c:\Users\corne\Documents\stage\website improvements\site clone simular small fixes\afbeelingen"

files = [
    {"in": "spies.webp", "out": "spies_cropped.webp"},
    {"in": "helicopter.webp", "out": "helicopter_cropped.webp"},
    {"in": "meisje_schuin.webp", "out": "meisje_schuin_cropped.webp"},
    {"in": "meisje_laptop.webp", "out": "meisje_laptop_cropped.webp"}
]

for f in files:
    in_path = os.path.join(src_dir, f["in"])
    out_path = os.path.join(src_dir, f["out"])
    
    if not os.path.exists(in_path):
        print(f"File {f['in']} not found")
        continue
        
    img = Image.open(in_path)
    if img.mode != 'RGBA':
        print(f"Skipping {f['in']} - no alpha channel (mode={img.mode})")
        continue
        
    # Get the bounding box of non-zero alpha pixels
    # bbox is a tuple: (left, upper, right, lower)
    bbox = img.getbbox()
    if bbox:
        cropped = img.crop(bbox)
        cropped.save(out_path, "WEBP", quality=90)
        print(f"Cropped {f['in']}:")
        print(f"  Original size: {img.size[0]}x{img.size[1]}")
        print(f"  Cropped bbox: {bbox}")
        print(f"  New size: {cropped.size[0]}x{cropped.size[1]}")
        print(f"  File size: {os.path.getsize(out_path)/1024:.1f} KB")
    else:
        print(f"No non-transparent pixels found in {f['in']}")
