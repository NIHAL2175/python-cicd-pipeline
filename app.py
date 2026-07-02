from flask import Flask, request, jsonify, render_template
from calculator import ScientificCalculator

app = Flask(__name__)
calc = ScientificCalculator()


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/add")
def add():
    a = float(request.args.get("a", 0))
    b = float(request.args.get("b", 0))
    return jsonify({
        "result": calc.add(a, b)
    })


@app.route("/health")
def health():
    return jsonify({
        "status": "UP"
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)