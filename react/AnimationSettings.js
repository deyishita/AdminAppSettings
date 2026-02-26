import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import saveAppSettings from './mutations/SaveAppSettings.graphql'
//import { useAppSettings } from './Config/settingSchema'
import { Dropdown, Button } from 'vtex.styleguide'
import styles from './animationSettings.css'
import appSettings from './query/getAppSettings.graphql'

const AnimationSettings = () => {
  const [isEnabled, setIsEnabled] = useState(false)
  const [quickView, setQuickView] = useState(1000)
  const [flyCoinToCartSpeed, setFlyCoinToCartSpeed] = useState(1)
  const [dropCoinSpeed, setDropCoinSpeed] = useState(200)
  const [priceRefreshTime, setPriceRefreshTime] = useState(1000)
  const [loading, setLoading] = useState(false)


  const options = [
    { value: 1000, label: "1000 ms" },
    { value: 2000, label: "2000 ms" },
    { value: 3000, label: "3000 ms" },
    { value: 4000, label: "4000 ms" },
    { value: 5000, label: "5000 ms" },
    { value: 6000, label: "6000 ms" },
    { value: 7000, label: "7000 ms" },
    { value: 8000, label: "8000 ms" },
    { value: 9000, label: "9000 ms" },
    { value: 10000, label: "10000 ms" },
  ]

  const quickViewSpeedOptions = [
    { value: 1, label: "1000 ms" },
    { value: 2, label: "2000 ms" },
    { value: 3, label: "3000 ms" },
    { value: 4, label: "4000 ms" },
    { value: 5, label: "5000 ms" },
    { value: 6, label: "6000 ms" },
    { value: 7, label: "7000 ms" },
    { value: 8, label: "8000 ms" },
    { value: 9, label: "9000 ms" },
    { value: 10, label: "10000 ms" },
  ]

  const flyCoinOptions = [
    { value: 1, label: "1000 ms" },
    { value: 2, label: "2000 ms" },
    { value: 3, label: "3000 ms" },
    { value: 4, label: "4000 ms" },
    { value: 5, label: "5000 ms" },
    { value: 6, label: "6000 ms" },
    { value: 7, label: "7000 ms" },
    { value: 8, label: "8000 ms" },
    { value: 9, label: "9000 ms" },
    { value: 10, label: "10000 ms" },
  ]

  const coinDropOptions = [
    { value: 200, label: "200 ms" },
    { value: 300, label: "300 ms" },
    { value: 400, label: "400 ms" },
    { value: 500, label: "500 ms" },
    { value: 600, label: "600 ms" },
    { value: 700, label: "700 ms" },
    { value: 800, label: "800 ms" },
    { value: 900, label: "900 ms" },
    { value: 1000, label: "1000 ms" },
    { value: 1100, label: "1100 ms" },
    { value: 1200, label: "1200 ms" }
  ]


  const { data, loading: queryLoading } = useQuery(appSettings)
  console.log('data settings>>>>', data);


  // ✅ Load values from query
  useEffect(() => {
    if (data?.appSettings?.message) {
      try {
        const parsed = JSON.parse(data.appSettings.message)

        setIsEnabled(parsed.siteAnimationEnabled ?? false)
        setQuickView(Number(parsed.quickViewAnimationSpeed) || 1000)
        setFlyCoinToCartSpeed(Number(parsed.flyCoinToCartSpeed) || 1)
        setDropCoinSpeed(Number(parsed.dropCoinSpeed) || 200)
        setPriceRefreshTime(Number(parsed.priceRefreshTime) || 1000)
      } catch (error) {
        console.error('Error parsing settings:', error)
      }
    }
}, [data])

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

  if (queryLoading) {
    return <div className={styles.container}>Loading settings...</div>
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
        options={quickViewSpeedOptions}
        value={quickView}
        onChange={({ target: { value } }) => setQuickView(Number(value))}
      />
    </div>

    {/* Fly Coin */}
    <div className={styles.section}>
      <label className={styles.label}>
        Fly Coin to Cart Speed (ms)
      </label>
      <Dropdown
        size="medium"
        options={flyCoinOptions}
        value={flyCoinToCartSpeed}
        onChange={({target: { value }}) => setFlyCoinToCartSpeed(Number(value))}
      />
    </div>

    {/* Drop Coin */}
    <div className={styles.section}>
      <label className={styles.label}>
        Drop Coin Animation Speed (ms)
      </label>
      <Dropdown
        size="medium"
        options={coinDropOptions}
        value={dropCoinSpeed}
        onChange={({target: { value }}) => setDropCoinSpeed(Number(value))}
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
        onChange={({ target: { value } }) => setPriceRefreshTime(Number(value))}
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
