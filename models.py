from main import db
from hashlib import blake2b

class Link(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    short = db.Column(db.String(6), index=True, unique=True)
    link_url = db.Column(db.String(120), index=True, unique=True)
    
    def set_hash(self, url_str):
        h = blake2b(digest_size=3)
        b = url_str.encode(encoding='UTF-8')
        h.update(b)
        hash_str = h.hexdigest()
        self.short = hash_str

    def __repr__(self):
        return f'<Link {self.link_url} {self.short}>'
