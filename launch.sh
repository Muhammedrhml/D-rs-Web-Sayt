#!/bin/bash

# Sevgililer Zamanı - Romantic Time Calculator
# Launch script

echo "🚀 Sevgililer Zamanı sitesi başlatılıyor..."
echo "💕 Romantic Time Calculator starting..."
echo ""

# Check if Python3 is available
if command -v python3 &> /dev/null; then
    echo "✅ Python3 bulundu!"
    echo "🌐 HTTP server başlatılıyor..."
    echo ""
    echo "📱 Tarayıcınızda aşağıdaki adrese gidin:"
    echo "   http://localhost:8000"
    echo ""
    echo "🛑 Durdurmak için Ctrl+C basın"
    echo ""
    echo "-----------------------------------"
    
    # Start Python HTTP server
    python3 -m http.server 8000
    
elif command -v python &> /dev/null; then
    echo "✅ Python bulundu!"
    echo "🌐 HTTP server başlatılıyor..."
    echo ""
    echo "📱 Tarayıcınızda aşağıdaki adrese gidin:"
    echo "   http://localhost:8000"
    echo ""
    echo "🛑 Durdurmak için Ctrl+C basın"
    echo ""
    echo "-----------------------------------"
    
    # Start Python HTTP server
    python -m http.server 8000
    
else
    echo "❌ Python bulunamadı!"
    echo "🔧 Lütfen Python yükleyin veya index.html dosyasını doğrudan tarayıcınızda açın."
    echo ""
    echo "💡 Alternatif: index.html dosyasını çift tıklayarak açabilirsiniz."
fi