import os
from PIL import Image

src_dir = r"c:\Users\corne\Documents\stage\website improvements\site clone simular small fixes\afbeelingen"
in_path = os.path.join(src_dir, "Typemission_Fotoshoot-15.png")
out_path = os.path.join(src_dir, "spies.webp")

if not os.path.exists(in_path):
    print(f"Error: {in_path} not found.")
    exit(1)

print("Opening original high-res image...")
img = Image.open(in_path)
print(f"Original size: {img.size[0]}x{img.size[1]} (mode={img.mode})")

if img.mode != 'RGBA':
    print("Converting to RGBA mode...")
    img = img.convert('RGBA')

print("Calculating bounding box of non-transparent pixels...")
bbox = img.getbbox()
if not bbox:
    print("Error: No non-transparent pixels found.")
    exit(1)

print(f"Cropping to bounding box: {bbox}...")
cropped = img.crop(bbox)
print(f"Cropped size: {cropped.size[0]}x{cropped.size[1]}")

# Resize cropped image to high resolution height (e.g. 1600px)
target_height = 1600
w, h = cropped.size
ratio = target_height / float(h)
target_width = int(w * ratio)

print(f"Resizing to {target_width}x{target_height} for crisp rendering...")
resized = cropped.resize((target_width, target_height), Image.Resampling.LANCZOS)

print(f"Saving to {out_path} as WebP...")
resized.save(out_path, "WEBP", quality=90)

size_mb = os.path.getsize(out_path) / 1024 / 1024
print(f"Done! Saved {out_path} ({size_mb:.3f} MB)")
