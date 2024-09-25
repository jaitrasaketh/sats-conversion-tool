"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SatoshiConverter() {
  const [satoshis, setSatoshis] = useState("")
  const [finalSatoshi, setFinalSatoshi] = useState("")
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  const [conversionRate, setConversionRate] = useState<number | null>(null)

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch('/api/cmc');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setConversionRate(data);
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
      }
    };

    fetchBitcoinPrice();
  }, []);

  const handleConvert = () => {
    const satoshiAmount = parseFloat(satoshis)
    setFinalSatoshi(satoshis)
    if (!isNaN(satoshiAmount) && satoshiAmount > 0 && conversionRate !== null) {
      const result = satoshiAmount * conversionRate * 0.00000001
      setConvertedAmount(result)
    } else {
      setConvertedAmount(null)
    }
  }

  const isButtonDisabled = isNaN(parseFloat(satoshis)) || parseFloat(satoshis) <= 0 || conversionRate === null

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Satoshi to INR Converter</CardTitle>
          <CardDescription>Convert Satoshis to Indian Rupees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="satoshi-input">Satoshis</Label>
              <Input
                id="satoshi-input"
                type="number"
                placeholder="Enter amount (e.g., 100000 for 0.001 BTC)"
                value={satoshis}
                onChange={(e) => setSatoshis(e.target.value)}
                aria-describedby="satoshi-input-description"
              />
              <p id="satoshi-input-description" className="text-sm text-muted-foreground">
                1 BTC = 100,000,000 Satoshis
              </p>
            </div>
            <Button 
              onClick={handleConvert} 
              className="w-full" 
              disabled={isButtonDisabled}
            >
              Convert to INR
            </Button>
            <div className="h-16 flex items-center justify-center">
              {convertedAmount !== null && (
                <div className="text-center">
                  <p className="text-lg font-semibold">
                    {parseFloat(finalSatoshi).toLocaleString()} Satoshis =
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    ₹{convertedAmount.toFixed(4)} INR
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}