"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Activity, Scale, Ruler, Calendar } from "lucide-react"

export default function Component() {
  const [age, setAge] = useState(25)
  const [height, setHeight] = useState(170)
  const [weight, setWeight] = useState(70)
  const [bmi, setBmi] = useState<number | null>(null)
  const [category, setCategory] = useState("")

  const calculateBMI = () => {
    const heightInMeters = height / 100
    const bmiValue = weight / (heightInMeters * heightInMeters)
    setBmi(parseFloat(bmiValue.toFixed(1)))

    if (bmiValue < 18.5) setCategory("Underweight")
    else if (bmiValue < 25) setCategory("Normal weight")
    else if (bmiValue < 30) setCategory("Overweight")
    else setCategory("Obese")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold text-center">BMI Calculator</CardTitle>
          <CardDescription className="text-center text-blue-100">
            Calculate your Body Mass Index based on age, height, and weight
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-lg font-medium flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Age
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="age"
                    min={1}
                    max={120}
                    step={1}
                    value={[age]}
                    onValueChange={(value) => setAge(value[0])}
                    className="flex-grow"
                  />
                  <span className="font-bold text-lg w-12 text-center">{age}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="height" className="text-lg font-medium flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-blue-500" />
                  Height (cm)
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="height"
                    min={50}
                    max={250}
                    step={1}
                    value={[height]}
                    onValueChange={(value) => setHeight(value[0])}
                    className="flex-grow"
                  />
                  <span className="font-bold text-lg w-12 text-center">{height}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-lg font-medium flex items-center gap-2">
                  <Scale className="w-5 h-5 text-blue-500" />
                  Weight (kg)
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="weight"
                    min={1}
                    max={200}
                    step={1}
                    value={[weight]}
                    onValueChange={(value) => setWeight(value[0])}
                    className="flex-grow"
                  />
                  <span className="font-bold text-lg w-12 text-center">{weight}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <Button onClick={calculateBMI} className="w-full text-lg h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                Calculate BMI
              </Button>
              {bmi !== null && (
                <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-semibold text-gray-700">Your BMI:</span>
                    <span className="text-3xl font-bold text-blue-600">{bmi}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className={`w-6 h-6 ${getCategoryColor(category)}`} />
                    <span className="text-lg font-medium text-gray-700">Category: {category}</span>
                  </div>
                  <p className="mt-4 text-sm text-gray-600">
                    {getBMIMessage(category, age)}
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

function getCategoryColor(category: string): string {
  switch (category) {
    case "Underweight":
      return "text-yellow-500"
    case "Normal weight":
      return "text-green-500"
    case "Overweight":
      return "text-orange-500"
    case "Obese":
      return "text-red-500"
    default:
      return "text-gray-500"
  }
}

function getBMIMessage(category: string, age: number): string {
  if (age < 20) {
    return "BMI is not the best measure for people under 20. Please consult with a healthcare provider for a more accurate assessment."
  }
  switch (category) {
    case "Underweight":
      return "You may need to gain some weight. Consult with a nutritionist for a healthy diet plan."
    case "Normal weight":
      return "Great job! You're in a healthy weight range. Keep up the good work with a balanced diet and regular exercise."
    case "Overweight":
      return "You may benefit from losing some weight. Consider increasing physical activity and improving your diet."
    case "Obese":
      return "Your health may be at risk. It's recommended to consult with a healthcare provider for a personalized weight management plan."
    default:
      return "Please calculate your BMI for a personalized message."
  }
}