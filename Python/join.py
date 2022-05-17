template = open("../ReactJS/ipynb.html","r").read()
fieldsjs = open("./dist/bundle.js","r").read()

f = open("index.html","w")
f.write(template.replace("BUNDLEJS",fieldsjs))
f.close()

from IPython.display import IFrame
IFrame(src='index.html', width=600, height=400)
