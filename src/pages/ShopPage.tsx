import { useState, useMemo, useEffect, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, X, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products, bundleDeals } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ui/ProductCard';
import type { Condition, FilterState } from '../types';

const CONDITIONS: Condition[] = ['BNWT', 'Good', 'Fair', 'Worn'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '26', '28', '30', '32', '34', '6', '7', '8', '9', '10', 'One Size'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'popular', label: 'Most Popular' },
] as const;

const initialFilters: FilterState = {
  categories: [],
  sizes: [],
  conditions: [],
  priceRange: [0, 5000],
  brands: [],
  search: '',
  sortBy: 'newest',
};

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    ...initialFilters,
    categories: searchParams.get('category') ? [searchParams.get('category')!] : [],
    search: searchParams.get('search') || '',
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState<'items' | 'bundles'>(
    searchParams.get('tab') === 'bundles' ? 'bundles' : 'items'
  );

  // Sync URL params
  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const tabParam = searchParams.get('tab');
    setFilters((f) => ({
      ...f,
      categories: category ? [category] : [],
      search: search || '',
    }));
    if (tabParam === 'bundles') setTab('bundles');
  }, [searchParams]);


  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.conditions.length > 0) {
      result = result.filter((p) => filters.conditions.includes(p.condition));
    }
    if (filters.sizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
    }
    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    switch (filters.sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'popular': result.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }

    return result;
  }, [filters]);

  const toggleFilter = <K extends 'categories' | 'conditions' | 'sizes' | 'brands'>(
    key: K,
    value: string
  ) => {
    setFilters((f) => ({
      ...f,
      [key]: (f[key] as string[]).includes(value)
        ? (f[key] as string[]).filter((v) => v !== value)
        : [...(f[key] as string[]), value],
    }));
  };

  const clearFilters = () => setFilters(initialFilters);
  const activeFilterCount =
    filters.categories.length +
    filters.conditions.length +
    filters.sizes.length +
    filters.brands.length +
    (filters.search ? 1 : 0);

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="bg-[#0D0905] border-b border-[#2E2116] py-10">
        <div className="container-pad">
          <h1 className="text-4xl font-black text-[#F5F0E8] mb-2">
            {tab === 'bundles' ? 'Bundle' : 'Shop'} <span className="text-gradient">
              {tab === 'bundles' ? 'Deals' : 'All Items'}
            </span>
          </h1>
          <p className="text-[#9E8E78]">
            {tab === 'items'
              ? `${filtered.length} preloved finds available`
              : `${bundleDeals.length} bundle deals available`}
          </p>
        </div>
      </div>

      <div className="container-pad py-8">
        {/* Tab switcher */}
        <div className="flex gap-2 mb-6">
          <button
            id="tab-items"
            onClick={() => setTab('items')}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
              tab === 'items'
                ? 'bg-[#F59E0B] text-[#0A0705]'
                : 'bg-[#1E160E] text-[#9E8E78] border border-[#2E2116] hover:border-[#F59E0B]/30'
            }`}
          >
            Individual Items
          </button>
          <button
            id="tab-bundles"
            onClick={() => setTab('bundles')}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
              tab === 'bundles'
                ? 'bg-[#F59E0B] text-[#0A0705]'
                : 'bg-[#1E160E] text-[#9E8E78] border border-[#2E2116] hover:border-[#F59E0B]/30'
            }`}
          >
            Bundle Deals 🔥
          </button>
        </div>

        {tab === 'bundles' ? (
          /* Bundle deals grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bundleDeals.map((deal) => (
              <div key={deal.id} className="bg-[#150F0A] border border-[#2E2116] rounded-2xl overflow-hidden card-hover">
                <div className="relative h-48">
                  <img src={deal.image} alt={deal.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#150F0A] to-transparent" />
                  <div className="absolute top-3 right-3 bg-[#E11D48] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    Save ₱{(deal.originalPrice - deal.price).toLocaleString()}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-[#F59E0B]" />
                    <span className="text-[#F59E0B] text-xs font-bold">{deal.itemCount} items included</span>
                  </div>
                  <h3 className="text-[#F5F0E8] font-bold text-lg mb-2">{deal.title}</h3>
                  <p className="text-[#9E8E78] text-sm mb-4">{deal.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[#F59E0B] font-black text-xl">₱{deal.price.toLocaleString()}</span>
                      <span className="text-[#9E8E78] text-sm line-through ml-2">₱{deal.originalPrice.toLocaleString()}</span>
                    </div>
                    <button className="btn-primary text-sm px-4 py-2">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Items with filters */
          <div className="flex gap-6">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="bg-[#150F0A] border border-[#2E2116] rounded-2xl p-5 sticky top-24">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-[#F5F0E8] font-bold">Filters</h3>
                  {activeFilterCount > 0 && (
                    <button onClick={clearFilters} className="text-[#E11D48] text-xs hover:underline">
                      Clear all
                    </button>
                  )}
                </div>

                {/* Search */}
                <div className="mb-5">
                  <label className="text-[#9E8E78] text-xs font-semibold uppercase tracking-wider block mb-2">Search</label>
                  <div className="flex items-center gap-2 bg-[#1E160E] border border-[#2E2116] rounded-xl px-3 py-2">
                    <Search className="w-3.5 h-3.5 text-[#9E8E78]" />
                    <input
                      id="shop-search"
                      type="text"
                      placeholder="Search..."
                      value={filters.search}
                      onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                      className="bg-transparent text-sm text-[#F5F0E8] placeholder-[#9E8E78] outline-none flex-1"
                    />
                    {filters.search && (
                      <button onClick={() => setFilters((f) => ({ ...f, search: '' }))}>
                        <X className="w-3.5 h-3.5 text-[#9E8E78] hover:text-[#F5F0E8]" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Category */}
                <FilterSection label="Category">
                  {categories.map((cat) => (
                    <FilterChip
                      key={cat.id}
                      label={`${cat.emoji} ${cat.name}`}
                      active={filters.categories.includes(cat.id)}
                      onClick={() => toggleFilter('categories', cat.id)}
                    />
                  ))}
                </FilterSection>

                {/* Condition */}
                <FilterSection label="Condition">
                  {CONDITIONS.map((c) => (
                    <FilterChip
                      key={c}
                      label={c}
                      active={filters.conditions.includes(c)}
                      onClick={() => toggleFilter('conditions', c)}
                    />
                  ))}
                </FilterSection>

                {/* Price */}
                <FilterSection label="Max Price">
                  <div className="space-y-2">
                    <input
                      id="price-range"
                      type="range"
                      min={0}
                      max={5000}
                      step={100}
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters((f) => ({ ...f, priceRange: [0, +e.target.value] }))}
                      className="w-full accent-[#F59E0B]"
                    />
                    <div className="flex justify-between text-xs text-[#9E8E78]">
                      <span>₱0</span>
                      <span className="text-[#F59E0B] font-semibold">₱{filters.priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </FilterSection>

                {/* Sizes */}
                <FilterSection label="Size">
                  <div className="flex flex-wrap gap-1.5">
                    {SIZES.slice(0, 12).map((s) => (
                      <button
                        key={s}
                        onClick={() => toggleFilter('sizes', s)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                          filters.sizes.includes(s)
                            ? 'bg-[#F59E0B] text-[#0A0705] border-[#F59E0B]'
                            : 'bg-transparent text-[#9E8E78] border-[#2E2116] hover:border-[#F59E0B]/30'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </FilterSection>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  id="filter-toggle"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden btn-outline text-sm py-2.5"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                </button>

                <div className="flex-1" />

                {/* Sort */}
                <select
                  id="sort-select"
                  value={filters.sortBy}
                  onChange={(e) => setFilters((f) => ({ ...f, sortBy: e.target.value as FilterState['sortBy'] }))}
                  className="bg-[#1E160E] border border-[#2E2116] text-[#F5F0E8] text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[#F59E0B]/50 cursor-pointer"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Active filters chips */}
              {activeFilterCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {filters.categories.map((c) => (
                    <ActiveChip key={c} label={c} onRemove={() => toggleFilter('categories', c)} />
                  ))}
                  {filters.conditions.map((c) => (
                    <ActiveChip key={c} label={c} onRemove={() => toggleFilter('conditions', c)} />
                  ))}
                  {filters.sizes.map((s) => (
                    <ActiveChip key={s} label={`Size: ${s}`} onRemove={() => toggleFilter('sizes', s)} />
                  ))}
                  {filters.search && (
                    <ActiveChip label={`"${filters.search}"`} onRemove={() => setFilters((f) => ({ ...f, search: '' }))} />
                  )}
                </div>
              )}

              {/* Grid */}
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#1E160E] flex items-center justify-center mb-4">
                    <Search className="w-7 h-7 text-[#2E2116]" />
                  </div>
                  <p className="text-[#F5F0E8] font-semibold mb-2">No items found</p>
                  <p className="text-[#9E8E78] text-sm mb-4">Try adjusting your filters</p>
                  <button onClick={clearFilters} className="btn-primary text-sm">Clear Filters</button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-[#0A0705] border-r border-[#2E2116] z-50 overflow-y-auto p-5"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[#F5F0E8] font-bold text-lg">Filters</h3>
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="w-5 h-5 text-[#9E8E78]" />
                </button>
              </div>
              {/* Mobile filter content (same as desktop) */}
              <FilterSection label="Category">
                {categories.map((cat) => (
                  <FilterChip
                    key={cat.id}
                    label={`${cat.emoji} ${cat.name}`}
                    active={filters.categories.includes(cat.id)}
                    onClick={() => toggleFilter('categories', cat.id)}
                  />
                ))}
              </FilterSection>
              <FilterSection label="Condition">
                {CONDITIONS.map((c) => (
                  <FilterChip
                    key={c}
                    label={c}
                    active={filters.conditions.includes(c)}
                    onClick={() => toggleFilter('conditions', c)}
                  />
                ))}
              </FilterSection>
              <FilterSection label="Max Price">
                <input
                  type="range"
                  min={0}
                  max={5000}
                  step={100}
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters((f) => ({ ...f, priceRange: [0, +e.target.value] }))}
                  className="w-full accent-[#F59E0B]"
                />
                <p className="text-[#F59E0B] text-sm font-semibold mt-1">Up to ₱{filters.priceRange[1].toLocaleString()}</p>
              </FilterSection>
              <button className="btn-primary w-full justify-center mt-6" onClick={() => setSidebarOpen(false)}>
                Apply Filters
              </button>
              {activeFilterCount > 0 && (
                <button className="btn-outline w-full justify-center mt-3 text-sm" onClick={clearFilters}>
                  Clear All
                </button>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

function FilterSection({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-5 pb-5 border-b border-[#2E2116] last:border-0 last:mb-0">
      <p className="text-[#9E8E78] text-xs font-semibold uppercase tracking-wider mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
        active
          ? 'bg-[#F59E0B] text-[#0A0705] border-[#F59E0B]'
          : 'bg-transparent text-[#9E8E78] border-[#2E2116] hover:border-[#F59E0B]/40 hover:text-[#F5F0E8]'
      }`}
    >
      {label}
    </button>
  );
}

function ActiveChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] text-xs font-semibold px-3 py-1.5 rounded-full">
      {label}
      <button onClick={onRemove}>
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}
