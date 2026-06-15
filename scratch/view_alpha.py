import os
from PIL import Image

src_dir = r"c:\Users\corne\Documents\stage\website improvements\site clone simular small fixes\afbeelingen"

def print_ascii_alpha(filename, cols=50, rows=25):
    path = os.path.join(src_dir, filename)
    if not os.path.exists(path):
        print(f"{filename} not found")
        return
    
    img = Image.open(path)
    if img.mode != 'RGBA':
        print(f"{filename} has no alpha channel (mode={img.mode})")
        return
        
    img_small = img.resize((cols, rows))
    pixels = img_small.load()
    
    print(f"\n--- Transparency Map of {filename} ({img.size[0]}x{img.size[1]}) ---")
    for r in range(rows):
        line = ""
        for c in range(cols):
            rgba = pixels[c, r]
            alpha = rgba[3]
            if alpha == 0:
                line += " "
            elif alpha < 128:
                line += "."
            elif alpha < 255:
                line += "x"
            else:
                line += "#"
        print(line)

print_ascii_alpha("helicopter.webp", 40, 20)
print_ascii_alpha("meisje_laptop.webp", 40, 20)
print_ascii_alpha("spies.webp", 50, 25)
print_ascii_alpha("meisje_schuin.webp", 40, 30)
