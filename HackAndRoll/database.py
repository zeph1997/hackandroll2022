import secret
from cryptography.fernet import Fernet
from firebase import Firebase
import math

locs = {"north":(1.437654934223027, 103.7890098692578),"south":(1.266075163515114, 103.82340848233613),"east":(1.3267096173254058, 103.94050037904894),"west":(1.318826868074472, 103.7630842996342),"central":(1.292037330209688, 103.85111964964663),"town":(1.292037330209688, 103.85111964964663)}

firebase = Firebase(secret.get_firebase_config())
auth = firebase.auth()
db = firebase.database()

def validate_user(username,password):
    if str(username) in db.child("Users").get().val():
        fernet = Fernet(secret.get_encryption_key())
        # password = fernet.encrypt(password.encode()).decode("utf-8")
        if fernet.decrypt(db.child("Users").child(str(username)).child("password").get().val().encode()).decode() == password:
            return True
    return False

def add_user(username,password):
    fernet = Fernet(secret.get_encryption_key())
    password = fernet.encrypt(password.encode()).decode("utf-8")
    toAdd = {username:{"password":password}}
    db.child("Users").update(toAdd)
    return True

def add_cuisine(username,cuisines):
    if str(username) in db.child("Users").get().val():
        toAdd = {"Cuisines":",".join(cuisines)}
        db.child("Users").child(str(username)).update(toAdd)
        return True
    return False

def set_age(username,age):
    if str(username) in db.child("Users").get().val():
        toAdd = {"Age":age}
        db.child("Users").child(str(username)).update(toAdd)
        return True
    return False

def has_preference(username):
    if str(username) in db.child("Users").get().val():
        if "Cuisines" in db.child("Users").child(str(username)).get().val():
            return True
    return False

def measure(lat_a,lng_a,lat_b,lng_b):
    R = 6378.137
    dLat = lat_b * math.pi / 180 - lat_a * math.pi / 180
    dLon = lng_b * math.pi / 180 - lng_a * math.pi / 180
    a = math.sin(dLat/2) * math.sin(dLat/2) + math.cos(lat_a * math.pi / 180) * math.cos(lat_b * math.pi / 180) * math.sin(dLon/2) * math.sin(dLon/2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    d = R * c
    return d * 1000

def get_nearby(user_location):
    out = []
    minDist = 2500
    locations = db.child("Locations").get().val()
    for i,j in locations.items():
        lat,lng = j["LatLng"].split(",")
        lat = float(lat)
        lng = float(lng)
        user_lat,user_lng = locs[user_location]
        if measure(lat,lng,user_lat,user_lng) < minDist:
            out.append(i)

def get_best_result(user_cuisines,user_location):
    restaurants_in_vicinity = get_nearby(user_location)
    best_result = []
    for i in restaurants_in_vicinity:
        if db.child("Locations").child(i).child("Cuisine") in user_cuisines:
            best_result.append(db.child("Locations").child(i).get().val())
    return best_result
