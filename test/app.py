# -*- coding: utf-8 -*-
"""
测试一下nginx实现跨域
"""
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
# CORS(app)

@app.route('/proxy')
def proxy():
    print(request.headers)
    data = {
      'name': 'proxy',
      'success': False
    }
    return jsonify(data)

@app.route('/proxy/user', methods=['GET', 'POST'])
def user():
    print(request.headers)
    data = {
      'name': 'leeing',
      'success': True
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)