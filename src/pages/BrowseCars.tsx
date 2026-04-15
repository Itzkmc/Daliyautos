import { useState, useEffect } from 'react';
import { ALL_CARS as FALLBACK_CARS } from '../constants';
import { CarType, Car } from '../types';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

export default function BrowseCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filter, setFilter] = useState<CarType | 'All'>('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'cars'), orderBy('updatedAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const carsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Car[];
      setCars(carsData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'cars');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const displayCars = cars.length > 0 ? cars : FALLBACK_CARS;

  const filteredCars = displayCars.filter(car => {
    const matchesType = filter === 'All' || car.type === filter;
    const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase()) || 
                          car.dealerName.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">BROWSE <span className="text-primary">CARS</span></h1>
            <p className="text-white/50">Discover premium vehicles available for import to Nigeria.</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-primary bg-primary/10 px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            {filteredCars.length} Vehicles Available
          </div>
        </div>

        {/* Filters */}
        <div className="glass p-6 rounded-3xl mb-12 flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative w-full lg:w-1/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
            <Input 
              placeholder="Search by model or dealer..." 
              className="pl-12 bg-white/5 border-white/10 rounded-2xl h-14 focus:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-4 w-full lg:w-2/3 justify-end">
            <div className="w-full sm:w-48">
              <Select onValueChange={(val) => setFilter(val as any)}>
                <SelectTrigger className="bg-white/5 border-white/10 rounded-2xl h-14">
                  <SelectValue placeholder="Car Type" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10 text-white">
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="EV">Electric (EV)</SelectItem>
                  <SelectItem value="Petrol">Petrol</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:w-48">
              <Select>
                <SelectTrigger className="bg-white/5 border-white/10 rounded-2xl h-14">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10 text-white">
                  <SelectItem value="0-20">Under ₦20M</SelectItem>
                  <SelectItem value="20-50">₦20M - ₦50M</SelectItem>
                  <SelectItem value="50-100">₦50M - ₦100M</SelectItem>
                  <SelectItem value="100+">₦100M+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="h-14 rounded-2xl px-6 border-white/10 glass hover:bg-white/5">
              <SlidersHorizontal className="mr-2" size={20} /> More Filters
            </Button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div key={car.id} className="group card-premium flex flex-col transition-all duration-500">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={car.image} 
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className={`px-2 py-1 rounded-[4px] text-[9px] font-extrabold uppercase tracking-widest ${
                    car.type === 'EV' ? 'bg-primary text-background' : 'bg-white/20 text-white backdrop-blur-md'
                  }`}>
                    {car.type === 'EV' ? '⚡ Electric' : car.type === 'Hybrid' ? '🔋 Hybrid' : '⛽ Petrol'}
                  </span>
                  {car.isVerified && (
                    <span className="bg-primary text-background px-2 py-1 rounded-[4px] text-[9px] font-extrabold uppercase tracking-widest">
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold mb-1 uppercase tracking-tight">{car.name}</h3>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider">{car.year} • {car.dealerName}</p>
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-primary font-black text-xl mb-6 uppercase tracking-tighter">Inquire for Price</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="btn-premium bg-primary hover:bg-primary/90 text-background">
                      Details
                    </Button>
                    <Button variant="outline" className="btn-premium border-white/10 hover:bg-white/5">
                      Inquire
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-20 glass rounded-[3rem]">
            <Search className="mx-auto text-white/20 mb-4" size={64} />
            <h3 className="text-2xl font-bold mb-2">No cars found</h3>
            <p className="text-white/40">Try adjusting your filters or search terms.</p>
            <Button 
              variant="link" 
              className="text-primary mt-4"
              onClick={() => {setSearch(''); setFilter('All');}}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
