Add-Type -AssemblyName System.Drawing
$imagePath = "c:\Users\corne\Documents\stage\website improvements\site clone simular small fixes\afbeelingen\Miss JI en kind.png"
$bmp = New-Object System.Drawing.Bitmap($imagePath)
$width = $bmp.Width
$height = $bmp.Height
Write-Host "Dimensions: $width x $height"

$minX = $width
$maxX = 0
$minY = $height
$maxY = 0

for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        $pixel = $bmp.GetPixel($x, $y)
        if ($pixel.A -gt 0) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Bounding box: X=$minX to $maxX, Y=$minY to $maxY"
Write-Host "Content dimensions: $($maxX - $minX) x $($maxY - $minY)"

# Let's crop it and save a cropped version!
$croppedBmp = New-Object System.Drawing.Bitmap ($maxX - $minX + 1), ($maxY - $minY + 1)
$g = [System.Drawing.Graphics]::FromImage($croppedBmp)
$destRect = New-Object System.Drawing.Rectangle 0, 0, ($maxX - $minX + 1), ($maxY - $minY + 1)
$srcRect = New-Object System.Drawing.Rectangle $minX, $minY, ($maxX - $minX + 1), ($maxY - $minY + 1)
$g.DrawImage($bmp, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$outputPath = "c:\Users\corne\Documents\stage\website improvements\site clone simular small fixes\afbeelingen\Miss JI en kind cropped.png"
$croppedBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

Write-Host "Saved cropped image to: $outputPath"

$bmp.Dispose()
$croppedBmp.Dispose()
