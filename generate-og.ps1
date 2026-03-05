Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap(1200, 630)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::White)

$imgPath = "C:\Users\gram\Desktop\Dev_project\BizDive\public\uploaded-og-logo.png"
if (Test-Path $imgPath) {
    $img = [System.Drawing.Image]::FromFile($imgPath)

    $targetWidth = 1100
    $scale = $targetWidth / $img.Width
    $targetHeight = $img.Height * $scale

    $x = (1200 - $targetWidth) / 2
    $y = (630 - $targetHeight) / 2

    # High quality rendering
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    
    $g.DrawImage($img, [int]$x, [int]$y, [int]$targetWidth, [int]$targetHeight)

    $bmp.Save("C:\Users\gram\Desktop\Dev_project\BizDive\src\app\opengraph-image.png", [System.Drawing.Imaging.ImageFormat]::Png)

    $img.Dispose()
} else {
    Write-Host "Logo file not found."
}

$g.Dispose()
$bmp.Dispose()
