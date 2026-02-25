import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import saveAppSettings from './mutations/SaveAppSettings.graphql'
import { Dropdown, Button } from 'vtex.styleguide'
import styles from './animationSettings.css'

const AnimationSettings = () => {
  const [isEnabled, setIsEnabled] = useState(false)

  const [quickView, setQuickView] = useState('100')
  const [flyCoinToCartSpeed, setFlyCoinToCartSpeed] = useState('100')
  const [dropCoinSpeed, setDropCoinSpeed] = useState('100')
  const [priceRefreshTime, setPriceRefreshTime] = useState('100')

  const [loading, setLoading] = useState(false)

  const options = [
    { value: "100", label: "100" },
    { value: "200", label: "200" },
    { value: "300", label: "300" },
    { value: "400", label: "400" },
    { value: "500", label: "500" },
    { value: "600", label: "600" },
    { value: "700", label: "700" },
    { value: "800", label: "800" },
    { value: "900", label: "900" },
    { value: "1000", label: "1000" },
  ]

  const [handleSaveAppSettings] = useMutation(saveAppSettings)

  // ✅ Save Button Click Handler
  const handleSave = async () => {
    setLoading(true)

    const allSettings = {
      siteAnimationEnabled: isEnabled,
      quickViewAnimationSpeed: quickView,
      flyCoinToCartSpeed: flyCoinToCartSpeed,
      dropCoinSpeed: dropCoinSpeed,
      priceRefreshTime: priceRefreshTime,
    }

    const variables = {
      app: 'demoaccount35.admin-app-settings',
      version: '1.x',
      settings: JSON.stringify(allSettings),
    }

    console.log('Saving all settings:', variables)

    try {
      const resp = await handleSaveAppSettings({ variables })
      console.log('Settings saved successfully:', resp?.data)
      alert('Settings saved successfully!')
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Error saving settings')
    } finally {
      setLoading(false)
    }
  }

  return (
  <div className={styles.container}>
    <h1 className={styles.title}>Animation Settings</h1>

    <p className={styles.subtitle}>
      Configure animation behavior for your store
    </p>

    <p className={styles.subtitles}>Sell Animations Settigs</p>
    {/* Checkbox */}
    <div className={styles.section}>
      <label className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          checked={isEnabled}
          onChange={(e) => setIsEnabled(e.target.checked)}
        />
        Site Animation Enabled/Disabled
      </label>
    </div>

    {/* Quick View */}
    <div className={styles.section}>
      <label className={styles.label}>
        360° Quick View (3D) Speed (ms)
      </label>
      <Dropdown
        size="medium"
        options={options}
        value={quickView}
        onChange={(e) => setQuickView(e.target.value)}
      />
    </div>

    {/* Fly Coin */}
    <div className={styles.section}>
      <label className={styles.label}>
        Fly Coin to Cart Speed (ms)
      </label>
      <Dropdown
        size="medium"
        options={options}
        value={flyCoinToCartSpeed}
        onChange={(e) => setFlyCoinToCartSpeed(e.target.value)}
      />
    </div>

    {/* Drop Coin */}
    <div className={styles.section}>
      <label className={styles.label}>
        Drop Coin Animation Speed (ms)
      </label>
      <Dropdown
        size="medium"
        options={options}
        value={dropCoinSpeed}
        onChange={(e) => setDropCoinSpeed(e.target.value)}
      />
    </div>

    {/* Price Refresh */}
    <div className={styles.section}>
      <p className={styles.subtitles}>Buy Animation Settings</p>
      <label className={styles.label}>
        Price Refresh Time (ms)
      </label>
      <Dropdown
        size="medium"
        options={options}
        value={priceRefreshTime}
        onChange={(e) => setPriceRefreshTime(e.target.value)}
      />
    </div>

    {/* Save Button */}
    <div className={styles.saveButtonWrapper}>
      <Button
        variation="primary"
        isLoading={loading}
        onClick={handleSave}
      >
        Save Settings
      </Button>
    </div>
  </div>
)
}

export default AnimationSettings;
