from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from typing import Optional
import os
import models, schemas
from database import get_db

import firebase_admin
from firebase_admin import credentials, auth as firebase_auth

router = APIRouter(prefix="/auth", tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login", auto_error=False)

# Initialize Firebase Admin
try:
    if not firebase_admin._apps:
        # User must place their service account key at backend/serviceAccountKey.json
        cred_path = os.path.join(os.path.dirname(__file__), "..", "serviceAccountKey.json")
        if os.path.exists(cred_path):
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred)
        else:
            print("WARNING: serviceAccountKey.json not found. Firebase Admin is not initialized properly.")
except Exception as e:
    print(f"Error initializing Firebase Admin: {e}")

def get_current_user(token: Optional[str] = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """
    Returns the authenticated user if a valid Firebase token is provided, 
    otherwise falls back to a Guest user for seamless access (or raises 401 if strict auth is desired).
    """
    if token and firebase_admin._apps:
        try:
            decoded_token = firebase_auth.verify_id_token(token)
            email = decoded_token.get("email")
            uid = decoded_token.get("uid")
            name = decoded_token.get("name", "Firebase User")
            
            if email:
                user = db.query(models.User).filter(models.User.email == email).first()
                if not user:
                    # Auto-register the user in PostgreSQL on first login
                    user = models.User(
                        name=name,
                        email=email,
                        hashed_password="firebase_managed"
                    )
                    db.add(user)
                    db.commit()
                    db.refresh(user)
                return user
        except Exception as e:
            print(f"Token verification failed: {e}")
            pass

    # Automatic Guest User fallback (as requested in original code)
    guest_email = "guest@insightai.com"
    guest_user = db.query(models.User).filter(models.User.email == guest_email).first()
    if not guest_user:
        guest_user = models.User(
            name="Guest User",
            email=guest_email,
            hashed_password="guestpass123"
        )
        db.add(guest_user)
        db.commit()
        db.refresh(guest_user)
    return guest_user

