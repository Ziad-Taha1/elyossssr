import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, ShoppingCart, Lock, Store as StoreIcon, 
  X, MessageCircle, Sun, Moon, CheckCircle2 
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

// --- Types ---
interface Product { id: string; name: string; price: number; category: string; image: string; description: string; }
interface CartItem extends Product { quantity: number; }
const CATEGORIES = ['الكل', 'بقوليات', 'زيوت', 'ألبان', 'مكرونة', 'منظفات', 'أخرى'];

// --- Main App ---
export default function App() {
  const [view, setView] = useState<'store' | 'admin'>('store');
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [products, setProducts] = useState<Product[]>(() => {
    const s = localStorage.getItem('yosr_p');
    return s ? JSON.parse(s) : [
      { id: '1', name: 'أرز فاخر المطبخ 1كجم', price: 35, category: 'بقوليات', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', description: 'أرز منقى' },
      { id: '2', name: 'زيت ممتاز 700مل', price: 65, category: 'زيوت', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', description: 'زيت نقي' }
    ];
  });
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const s = localStorage.getItem('yosr_c');
    return s ? JSON.parse(s) : [];
  });

  const whatsapp = "201227412513"; // رقمك

  useEffect(() => { localStorage.setItem('yosr_p', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('yosr_c', JSON.stringify(cart)); }, [cart]);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const addToCart = (p: Product) => {
    setCart((prev: CartItem[]) => {
      const ex = prev.find((i: CartItem) => i.id === p.id);
      if (ex) return prev.map((i: CartItem) => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...p, quantity: 1 }];
    });
    setShowToast(true); setTimeout(() => setShowToast(false), 2000);
  };

  const sendOrder = (info: any) => {
    const total = cart.reduce((a: number, b: CartItem) => a + (b.price * b.quantity), 0);
    const msg = `📦 طلب جديد من ماركت اليسر\n👤 العميل: ${info.name}\n📍 العنوان: ${info.address}\n----------------\n` + 
                cart.map((i: CartItem) => `• ${i.name} (${i.quantity} قطعة)`).join('\n') + 
                `\n----------------\n💰 الإجمالي: ${total} ج.م`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`);
    setCart([]); setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen transition-colors">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={18} /> <span className="font-bold text-sm">تمت الإضافة!</span>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b dark:border-gray-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('store')}>
            <div className={`p-2 rounded-xl ${view === 'admin' ? 'bg-amber-500' : 'bg-emerald-600'} text-white`}>
              <StoreIcon size={20} />
            </div>
            <h1 className="font-black text-lg dark:text-white">ماركت اليسر</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-white">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsCartOpen(true)} className="relative p-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-xl">
              <ShoppingCart size={20} />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] px-1.5 rounded-full">{cart.length}</span>}
            </button>
            <button onClick={() => setView(view === 'store' ? 'admin' : 'store')} className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl">
              {view === 'store' ? 'الإدارة' : 'المتجر'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {view === 'store' ? (
          <Store products={products} onAdd={addToCart} whatsapp={whatsapp} />
        ) : (
          !isAdminAuth ? (
            <div className="max-w-md mx-auto mt-10 p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl text-center">
              <Lock className="mx-auto mb-4 text-amber-500" size={40} />
              <h2 className="text-xl font-black mb-6 dark:text-white">دخول الإدارة</h2>
              <input type="password" placeholder="كلمة السر" className="w-full p-4 rounded-xl border dark:bg-gray-900 mb-4 text-center font-bold" value={passInput} onChange={e => {setPassInput(e.target.value); if(e.target.value === '678910') setIsAdminAuth(true);}} />
              <p className="text-[10px] text-gray-400 italic">اكتب كلمة السر الخاصة بالادارة</p>
            </div>
          ) : (
            <Admin products={products} setProducts={setProducts} onLogout={() => setIsAdminAuth(false)} />
          )
        )}
      </main>

      {/* Cart Drawer */}
      {isCartOpen && <CartDrawer cart={cart} setCart={setCart} onClose={() => setIsCartOpen(false)} onSend={sendOrder} />}
    </div>
  );
}

// --- Sub Components ---
function Store({ products, onAdd, whatsapp }: { products: Product[], onAdd: (p: Product) => void, whatsapp: string }) {
  const [cat, setCat] = useState('الكل');
  const filtered = products.filter(p => cat === 'الكل' || p.category === cat);
  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)} className={`px-6 py-2 rounded-xl whitespace-nowrap text-xs font-bold ${cat === c ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-gray-800 dark:text-white'}`}>{c}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="bg-white dark:bg-gray-800 p-3 rounded-[2rem] shadow-sm border dark:border-gray-700">
            <img src={p.image} className="w-full aspect-square object-cover rounded-[1.5rem] mb-3" />
            <h3 className="font-bold text-sm line-clamp-1 dark:text-white">{p.name}</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="font-black text-emerald-600">{p.price} <small className="text-[10px]">ج.م</small></span>
              <button onClick={() => onAdd(p)} className="p-2 bg-emerald-600 text-white rounded-xl"><Plus size={16} /></button>
            </div>
          </div>
        ))}
      </div>
      {/* QR Code for WhatsApp Ordering */}
      <div className="mt-8 text-center">
        <h3 className="text-lg font-bold mb-4 dark:text-white">اطلب عبر واتساب</h3>
        <QRCodeCanvas value={`https://wa.me/${whatsapp}?text=مرحباً، أريد الطلب من ماركت اليسر`} size={128} />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">امسح الرمز للطلب مباشرة</p>
      </div>
    </div>
  );
}

function Admin({ products, setProducts, onLogout }: { products: Product[], setProducts: (p: Product[]) => void, onLogout: () => void }) {
  const [form, setForm] = useState({ name: '', price: '', category: 'أخرى', image: '' });
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault(); if(!form.name) return;
    setProducts([{ ...form, id: Date.now().toString(), price: Number(form.price), description: '', image: form.image || 'https://picsum.photos/400' }, ...products]);
    setForm({ name: '', price: '', category: 'أخرى', image: '' });
  };
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm space-y-4">
        <h2 className="font-black flex items-center gap-2 dark:text-white"><Plus size={20} /> إضافة منتج</h2>
        <input placeholder="اسم المنتج" className="w-full p-3 rounded-xl border dark:bg-gray-900 dark:text-white" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="السعر" type="number" className="w-full p-3 rounded-xl border dark:bg-gray-900 dark:text-white" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
        <select className="w-full p-3 rounded-xl border dark:bg-gray-900 dark:text-white" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={handleAdd} className="w-full py-3 bg-amber-500 text-white font-black rounded-xl">حفظ</button>
        <button onClick={onLogout} className="w-full text-red-500 text-xs font-bold">تسجيل خروج</button>
      </div>
      <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-right">
          <thead className="bg-gray-50 dark:bg-gray-900 text-[10px] font-black uppercase">
            <tr><th className="p-4">المنتج</th><th className="p-4 text-center">السعر</th><th className="p-4 text-center">حذف</th></tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {products.map((p: Product) => (
              <tr key={p.id} className="dark:text-white"><td className="p-4 text-sm font-bold">{p.name}</td><td className="p-4 text-center font-black">{p.price}</td><td className="p-4 text-center"><button onClick={() => setProducts(products.filter((x: Product)=>x.id!==p.id))} className="text-red-400"><Trash2 size={18} /></button></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CartDrawer({ cart, setCart, onClose, onSend }: { cart: CartItem[], setCart: (c: CartItem[]) => void, onClose: () => void, onSend: (info: any) => void }) {
  const [info, setInfo] = useState({ name: '', address: '' });
  const total = cart.reduce((a: number, b: CartItem) => a + (b.price * b.quantity), 0);
  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 h-full p-8 flex flex-col shadow-2xl">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-2xl font-black text-emerald-600">سلتك</h2>
          <button onClick={onClose}><X size={24} /></button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar">
          {cart.map((item: CartItem) => (
            <div key={item.id} className="flex gap-4 items-center bg-gray-50 dark:bg-gray-900 p-3 rounded-2xl">
              <img src={item.image} className="w-12 h-12 rounded-lg object-cover" />
              <div className="flex-1 font-bold text-xs dark:text-white">{item.name} <div className="text-emerald-600">{item.price} ج.م × {item.quantity}</div></div>
              <button onClick={() => setCart(cart.filter((i: CartItem)=>i.id!==item.id))} className="text-red-300"><Trash2 size={16}/></button>
            </div>
          ))}
        </div>
        <div className="mt-auto pt-6 border-t space-y-3">
          <input placeholder="اسمك" className="w-full p-3 rounded-xl border dark:bg-gray-900 dark:text-white" value={info.name} onChange={e=>setInfo({...info, name:e.target.value})} />
          <input placeholder="العنوان" className="w-full p-3 rounded-xl border dark:bg-gray-900 dark:text-white" value={info.address} onChange={e=>setInfo({...info, address:e.target.value})} />
          <div className="flex justify-between font-black text-lg dark:text-white"><span>الإجمالي:</span> <span>{total} ج.م</span></div>
          <button onClick={() => onSend(info)} className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl flex items-center justify-center gap-2"><MessageCircle size={20} /> اطلب واتساب</button>
        </div>
      </div>
    </div>
  );
}
