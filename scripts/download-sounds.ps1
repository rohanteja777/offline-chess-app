# Downloads Lichess "standard" board sounds (open source, Chess.com-style wooden clicks).
# Castle/Promote are not separate files on Lichess — we alias move/capture locally.
# Run from project root:  powershell -ExecutionPolicy Bypass -File scripts/download-sounds.ps1

$outDir = Join-Path $PSScriptRoot "..\public\sounds"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$base = "https://raw.githubusercontent.com/lichess-org/lila/master/public/sound/standard"

# End-game sounds use synthesized chimes in code (no victory.mp3 needed).
$downloads = @{
  "move.mp3"    = "Move.mp3"
  "capture.mp3" = "Capture.mp3"
  "check.mp3"   = "Check.mp3"
}

foreach ($entry in $downloads.GetEnumerator()) {
  $url = "$base/$($entry.Value)"
  $dest = Join-Path $outDir $entry.Key
  Write-Host "Downloading $($entry.Key) ..."
  Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing
}

# Optional aliases (same files, avoids 404 if old code expected these names)
Copy-Item (Join-Path $outDir "move.mp3") (Join-Path $outDir "castle.mp3") -Force
Copy-Item (Join-Path $outDir "capture.mp3") (Join-Path $outDir "promote.mp3") -Force

Write-Host "Done. Files in public/sounds:"
Get-ChildItem $outDir
