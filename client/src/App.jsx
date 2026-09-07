import { useEffect, useState } from 'react'

const API_URL = // adding backend running url  

// Format price in Indian rupees
function formatPrice(price) {
  return `₹${price.toLocaleString('en-IN')}`
}

function App() {
  // Page state
  const [activeTab, setActiveTab] = useState('marketplace')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState(null)

  // Load products from the API
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(`${API_URL}/products`)
        if (!response.ok) throw new Error('Unable to load products')
        setProducts(await response.json())
      } catch (fetchError) {
        setError(fetchError.message)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  // Filter products from the search text
  const visibleProducts = products.filter((product) => {
    const searchText = search.toLowerCase()
    return product.title.toLowerCase().includes(searchText) || product.category.toLowerCase().includes(searchText)
  })

  function openProduct(product) {
    setSelectedProduct(product)
    setSelectedVariant(product.variants[0])
    setSelectedPlan(product.emiPlans[1])
  }

  function closeProduct() {
    setSelectedProduct(null)
    setSelectedVariant(null)
    setSelectedPlan(null)
  }

  function showEmptyTab(tab) {
    setActiveTab(tab)
    closeProduct()
  }

  return (
    <div className="app-shell">
      {/* Main page */}
      <main>
        
        <section className="hero-banner">
          <img className="hero-image w-full scale-110 object-cover" src="/image1.webp" alt="Shop today, Pay later using Mutual funds" />        
        </section>

        {/* Shop tabs */}
        <nav className="shop-tabs" aria-label="Shop sections">
          
          <button className={activeTab === 'brands' ? 'tab active' : 'tab'} onClick={() => showEmptyTab('brands')}>Top Brands</button>
          
          <button className={activeTab === 'stores' ? 'tab active' : 'tab'} onClick={() => showEmptyTab('stores')}>Nearby Stores</button>

          <button className={activeTab === 'marketplace' ? 'tab active' : 'tab'} onClick={() => setActiveTab('marketplace')}>1Fi Marketplace</button>

        </nav>



        {
          activeTab !== 'marketplace' ? 
          
          <section className="blank-state">
            <div className="blank-icon">◌</div>
            <h2>{activeTab === 'brands' ? 'Top Brands' : 'Nearby Stores'}</h2>
            <p>This section is ready for the next assignment feature.</p>
          </section>
            
            : 
            
          <section className="marketplace">
            {/* Product list */}
            <label className="search-box">
              <span>⌕</span>
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products..." />
            </label>

            <h2 className="content-heading">
              {activeTab === 'marketplace' ? '1Fi Marketplace' : activeTab === 'brands' ? 'Top Brands' : 'Nearby Stores'}
            </h2>
            
            {
              loading  && 
              <div className="product-grid">
                {[1, 2, 3].map((item) => 
                <div className="skeleton-card" key={item}><div className="skeleton-image" />
                
                <div className="skeleton-line" />
                 <div className="skeleton-small" /></div>)
                }
                 
              </div>
            }

            {
              error   &&  
              <div className="error-state">
                <strong>We could not load the marketplace.</strong>
                <p>{error}.<code>Server is Down</code>.</p>
              </div>
            }
                
            { !loading  &&  !error && 
            
             <div className="product-grid">
              
               { 
                 visibleProducts.map((product) => 
                 
                 <article className="product-card" key={product.id} onClick={() => openProduct(product)}>

                  <div className="product-image"><img src={product.image} alt={product.title} /></div>
                 
                  <div className="product-info">
                    
                    <span className="category">{product.category}</span>
                    
                    <h3>{product.title}</h3>
                    
                    <p>From <strong>{formatPrice(product.startingPrice)}</strong></p>
                    
                    <button className="view-button">View details <span>→</span></button>
                    
                    </div>
                 </article>
                 )
                }
                
                </div>
           }
                
            { 
              !loading && !error && visibleProducts.length === 0 && 
              
              <div className="blank-state compact">
                 <h2>No products found</h2><p>Try a different search term.</p>
              </div>
             
            }
          </section>
        }
      
      </main>


      {/* Product details popup */}
      {
      selectedProduct && 
      
      <div className="modal-backdrop" onClick={closeProduct}>
        
        <section className="details-modal" onClick={(event) => event.stopPropagation()}>
          
          <button className="close-button" onClick={closeProduct} aria-label="Close product details">×</button>
          
          <div className="details-image">
             <img src={selectedProduct.image} alt={selectedProduct.title} />
          </div>
          
          <div className="details-content">
             
             <span className="category">{selectedProduct.category}</span>
             <h2>{selectedProduct.title}</h2>
             <p className="description">{selectedProduct.description}</p>
             <h4>Choose a variant</h4>
             <div className="variant-list">
                {
                  selectedProduct.variants.map((variant) => <button key={variant.name} className={selectedVariant.name === variant.name ? 'choice selected' : 'choice'} onClick={() => setSelectedVariant(variant)}>
                  <span>{variant.name}</span>
                  <strong>{formatPrice(variant.price)}</strong>
                  </button>
                  )
                }
             </div>
            
            <h4>Choose your EMI plan</h4>
            
            <div className="plan-list">
              {
                selectedProduct.emiPlans.map((plan) => <button key={plan.months} className={selectedPlan.months === plan.months ? 'plan selected' : 'plan'} onClick={() => setSelectedPlan(plan)}>
                  
                  <span>
                    <strong>{plan.months} months</strong>
                    <small>{plan.label}</small>
                  </span>
                  
                  <b>
                  {
                    formatPrice(plan.monthly)
                  }
                  
                  <small>/ month</small>
                  
                  </b>
                  </button>)
              } 
                 </div>
                    <button className="primary-button" onClick={() => alert(`Plan selected for ${selectedProduct.title}`)}>
                      Continue with {formatPrice(selectedPlan.monthly)} / month <span>→</span>
                    </button>
                 </div>
          </section>
      </div>
      }

      {/* Nav Bar */}
      <nav className="bottom-nav" aria-label="Main navigation">

        <button className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Home</span>
        </button>

        <button aria-current="page" className="nav-item active"><div className="active-indicator" /><svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg><span>Shop</span></button>
        <button className="nav-item"><svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg><span>EMI Dues</span></button>
        <button className="nav-item"><svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg><span>Limit</span></button>
        <button className="nav-item"><svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg><span>Profile</span></button>
      </nav>
    </div>
  )
}

export default App
