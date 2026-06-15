import os
from PIL import Image

src_dir = r"c:\Users\corne\Documents\stage\website improvements\site clone simular small fixes\afbeelingen"

targets = [
    {
        "file": "image.png",
        "out": "background.webp",
        "max_width": 2000,
        "quality": 85
    },
    {
        "file": "Typemission_Fotoshoot-15.png",
        "out": "spies.webp",
        "max_width": 1200,
        "quality": 85
    },
    {
        "file": "meisje laptop.png",
        "out": "meisje_laptop.webp",
        "max_width": 800,
        "quality": 85
    },
    {
        "file": "meisje met schuine achtergrond.png",
        "out": "meisje_schuin.webp",
        "max_width": 1200,
        "quality": 85
    },
    {
        "file": "helicopter.png",
        "out": "helicopter.webp",
        "max_width": 500,
        "quality": 85
    }
]

for t in targets:
    in_path = os.path.join(src_dir, t["file"])
    out_path = os.path.join(src_dir, t["out"])
    
    if not os.path.exists(in_path):
        print(f"Skipping {t['file']} - file not found")
        continue
        
    print(f"Processing {t['file']}...")
    img = Image.open(in_path)
    
    # Calculate new dimensions keeping aspect ratio
    w, h = img.size
    max_w = t["max_width"]
    if w > max_w:
        ratio = max_w / float(w)
        new_w = int(max_w)
        new_h = int(h * ratio)
        img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        print(f"  Resized from {w}x{h} to {new_w}x{new_h}")
    else:
        print(f"  Kept size {w}x{h}")
        
    # Save as WebP
    img.save(out_path, "WEBP", quality=t["quality"])
    old_size = os.path.getsize(in_path) / 1024 / 1024
    new_size = os.path.getsize(out_path) / 1024 / 1024
    print(f"  Saved as {t['out']} - Size: {old_size:.2f} MB -> {new_size:.2f} MB ({(new_size/old_size)*100:.1f}%)")

print("Done converting images!")
