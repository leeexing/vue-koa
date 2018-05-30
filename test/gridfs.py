# -*- coding: utf-8 -*-
"""
目标：使用python添加 gridfs 文件
目的：学习理解
"""
from pymongo import MongoClient

def main():
  db = MongoClient(host='mongodb://localhost:27017/test')

if __name__ == '__main__':
  main()
