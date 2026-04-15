import React, { useState, useEffect } from 'react';
import { useFirebase } from '../components/FirebaseProvider';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  LogOut, 
  LogIn, 
  Shield, 
  Car as CarIcon, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';
import { Car, CarType } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useFirebase();
  const [cars, setCars] = useState<Car[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    year: new Date().getFullYear(),
    type: 'EV' as CarType,
    image: '',
    dealerName: 'DailyAutos Direct',
    isVerified: true,
  });

  useEffect(() => {
    if (!isAdmin) return;

    const q = query(collection(db, 'cars'), orderBy('updatedAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const carsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Car[];
      setCars(carsData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'cars');
    });

    return () => unsubscribe();
  }, [isAdmin]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    try {
      if (editingCar) {
        const carRef = doc(db, 'cars', editingCar.id);
        await updateDoc(carRef, {
          ...formData,
          updatedAt: serverTimestamp(),
        });
        setEditingCar(null);
      } else {
        await addDoc(collection(db, 'cars'), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        setIsAdding(false);
      }
      setFormData({
        name: '',
        year: new Date().getFullYear(),
        type: 'EV',
        image: '',
        dealerName: 'DailyAutos Direct',
        isVerified: true,
      });
    } catch (error) {
      handleFirestoreError(error, editingCar ? OperationType.UPDATE : OperationType.CREATE, 'cars');
    }
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin || !window.confirm('Are you sure you want to delete this car?')) return;
    try {
      await deleteDoc(doc(db, 'cars', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `cars/${id}`);
    }
  };

  const startEdit = (car: Car) => {
    setEditingCar(car);
    setFormData({
      name: car.name,
      year: car.year,
      type: car.type,
      image: car.image,
      dealerName: car.dealerName,
      isVerified: car.isVerified,
    });
    setIsAdding(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full glass p-10 rounded-[2rem] text-center">
          <Shield className="mx-auto text-primary mb-6" size={48} />
          <h1 className="text-3xl font-black mb-4">ADMIN ACCESS</h1>
          <p className="text-muted-foreground mb-8">Please sign in with your authorized Google account to manage car listings.</p>
          <Button onClick={handleLogin} className="w-full h-14 rounded-xl gap-2 text-lg">
            <LogIn size={20} /> Sign In with Google
          </Button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full glass p-10 rounded-[2rem] text-center">
          <AlertCircle className="mx-auto text-destructive mb-6" size={48} />
          <h1 className="text-3xl font-black mb-4">ACCESS DENIED</h1>
          <p className="text-muted-foreground mb-8">Your account ({user.email}) is not authorized for admin access. Please contact the site owner.</p>
          <Button onClick={handleLogout} variant="outline" className="w-full h-14 rounded-xl gap-2">
            <LogOut size={20} /> Sign Out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="text-primary" size={20} />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Admin Dashboard</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">MANAGE <span className="text-primary">INVENTORY</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => {
                setIsAdding(!isAdding);
                setEditingCar(null);
              }} 
              className="h-14 px-8 rounded-xl gap-2"
            >
              {isAdding ? 'Cancel' : <><Plus size={20} /> Add New Car</>}
            </Button>
            <Button onClick={handleLogout} variant="outline" className="h-14 px-6 rounded-xl gap-2 border-white/10 glass">
              <LogOut size={20} />
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12"
            >
              <form onSubmit={handleSubmit} className="glass p-8 md:p-12 rounded-[2rem] grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Car Name</Label>
                    <Input 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Tesla Model 3" 
                      className="bg-white/5 border-white/10 rounded-xl h-14" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Year</Label>
                      <Input 
                        required
                        type="number"
                        value={formData.year}
                        onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
                        className="bg-white/5 border-white/10 rounded-xl h-14" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Type</Label>
                      <select 
                        className="w-full bg-white/5 border border-white/10 rounded-xl h-14 px-4 text-white focus:outline-none focus:border-primary appearance-none"
                        value={formData.type}
                        onChange={e => setFormData({...formData, type: e.target.value as CarType})}
                      >
                        <option value="EV">Electric (EV)</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Dealer Name</Label>
                    <Input 
                      required
                      value={formData.dealerName}
                      onChange={e => setFormData({...formData, dealerName: e.target.value})}
                      className="bg-white/5 border-white/10 rounded-xl h-14" 
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Image URL</Label>
                    <Input 
                      required
                      type="url"
                      value={formData.image}
                      onChange={e => setFormData({...formData, image: e.target.value})}
                      placeholder="https://images.unsplash.com/..." 
                      className="bg-white/5 border-white/10 rounded-xl h-14" 
                    />
                  </div>
                  <div className="flex items-center gap-4 h-14 px-4 glass rounded-xl">
                    <input 
                      type="checkbox" 
                      id="isVerified"
                      checked={formData.isVerified}
                      onChange={e => setFormData({...formData, isVerified: e.target.checked})}
                      className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="isVerified" className="cursor-pointer">Verified Listing</Label>
                  </div>
                  <Button type="submit" className="w-full h-14 rounded-xl text-lg font-bold mt-2">
                    {editingCar ? 'Update Listing' : 'Create Listing'}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div key={car.id} className="group glass rounded-[2rem] overflow-hidden border-white/5 hover:border-primary/20 transition-all">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    car.type === 'EV' ? 'bg-primary text-primary-foreground' : 'bg-white/20 text-white backdrop-blur-md'
                  }`}>
                    {car.type}
                  </span>
                  {car.isVerified && (
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                      <CheckCircle size={10} /> Verified
                    </span>
                  )}
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">{car.name}</h3>
                    <p className="text-muted-foreground text-sm">{car.year} • {car.dealerName}</p>
                  </div>
                </div>
                <div className="flex gap-3 pt-4 border-t border-white/5">
                  <Button 
                    onClick={() => startEdit(car)}
                    variant="outline" 
                    className="flex-1 h-12 rounded-xl gap-2 border-white/10 hover:bg-white/5"
                  >
                    <Edit2 size={16} /> Edit
                  </Button>
                  <Button 
                    onClick={() => handleDelete(car.id)}
                    variant="outline" 
                    className="h-12 w-12 rounded-xl p-0 border-white/10 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {cars.length === 0 && (
            <div className="col-span-full py-24 text-center glass rounded-[3rem]">
              <CarIcon className="mx-auto text-white/10 mb-6" size={64} />
              <h3 className="text-2xl font-bold mb-2">No cars in inventory</h3>
              <p className="text-muted-foreground">Start by adding your first vehicle listing.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
