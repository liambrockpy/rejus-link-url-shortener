from flask import Flask, render_template, redirect, url_for
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug import exceptions
from models import Link
from forms import LinkForm
from utils.parse_url import parse_url
import qrcode

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)


# store recent link in global var
g_link = []

@app.route('/', methods=['GET', 'POST'])
def index():
    form = LinkForm()
    if form.validate_on_submit():
        link = Link(link_url=parse_url(form.url.data))
        link.set_hash(parse_url(form.url.data))
        img = qrcode.make(link.link_url)
        path = './app/static/images'
        img.save(f'{path}/qrcode-{link.short}.png')

        existing = Link.query.filter_by(short=link.short).first()
        if not existing:
            db.session.add(link)
            db.session.commit()
        global g_link
        g_link = [link.short, parse_url(link.link_url)]
        return redirect(url_for('index'))

    temp = g_link
    g_link = []
    return render_template('home.html', form=form, result = temp)

@app.route('/<string:hash>')
def short(hash):
    link = Link.query.filter_by(short=hash).first_or_404()
    url = parse_url(link.link_url)
    return redirect(url)

@app.errorhandler(exceptions.NotFound)
def error_404(err):
    return redirect('/')

@app.errorhandler(exceptions.BadRequest)
def error_400(err):
    return redirect('/')

@app.errorhandler(exceptions.InternalServerError)
def error_500(err):
    return redirect('/')


if __name__ == '__main__':
  app.run(port=5000)
