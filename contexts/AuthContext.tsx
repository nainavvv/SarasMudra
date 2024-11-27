import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserProgress = {
  lastScreen: string;
  completedLessons: string[];
};

type UserProfile = {
  email: string;
  name: string;
  age: string;
  occupation: string;
  reason: string;
  hearingStatus: string;
  language: string;
  progress: UserProgress;
};

type AuthContextType = {
  user: UserProfile | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  updateProgress: (progress: Partial<UserProgress>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Load user data from AsyncStorage when the app starts
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    loadUser();
  }, []);

  const signUp = async (email: string, password: string) => {
    // In a real app, you would send this data to your backend
    const newUser: UserProfile = {
      email,
      name: '',
      age: '',
      occupation: '',
      reason: '',
      hearingStatus: '',
      language: '',
      progress: {
        lastScreen: 'language',
        completedLessons: [],
      },
    };
    setUser(newUser);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
  };

  const signIn = async (email: string, password: string) => {
    // In a real app, you would validate credentials with your backend
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.email === email) {
        setUser(parsedUser);
      } else {
        throw new Error('Invalid credentials');
      }
    } else {
      throw new Error('User not found');
    }
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  const updateProfile = async (profile: Partial<UserProfile>) => {
    if (user) {
      const updatedUser = { ...user, ...profile };
      setUser(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const updateProgress = async (progress: Partial<UserProgress>) => {
    if (user) {
      const updatedUser = {
        ...user,
        progress: { ...user.progress, ...progress },
      };
      setUser(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, updateProfile, updateProgress }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};