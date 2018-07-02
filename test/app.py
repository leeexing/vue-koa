# -*- coding: utf-8 -*-
"""
测试一下nginx实现跨域
"""
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
# CORS(app)

@app.route('/proxy/user')
def user():
    print(request.headers)
    data = {
      'name': 'leeing',
      'success': True
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)