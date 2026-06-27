'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import { Calendar, Clock, MapPin, Users, Car, Phone, CreditCard, Calculator } from 'lucide-react';
import { useLocale } from 'next-intl';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';
import GooglePlacesAutocomplete from '@/components/forms/GooglePlacesAutocomplete';
import { calculatePriceEstimate } from '@/lib/utils/client-maps';
import { bookingFormSchema, type BookingFormInput } from '@/lib/validations/booking';
import { BUSINESS_INFO } from '@/lib/constants/business';
import 'react-datepicker/dist/react-datepicker.css';

type BookingFormData = BookingFormInput;

const timeSlots = [
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
  '22:00', '22:30', '23:00', '23:30',
];

export default function BookingPage() {
  const locale = useLocale();
  const isDE = locale === 'de';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [showPriceCalculator, setShowPriceCalculator] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      passengers: 1,
      vehicleType: 'executive',
      serviceType: 'oneway',
      paymentMethod: 'cash',
      pickupDate: new Date(),
    },
  });

  const watchedValues = watch();
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateEstimatedPrice = async () => {
    const { vehicleType, serviceType, pickupLocation, dropoffLocation, pickupTime } = watchedValues;

    if (!vehicleType || !pickupLocation || !dropoffLocation) return;
    if (pickupLocation.length < 3 || dropoffLocation.length < 3) return;

    setIsCalculating(true);
    try {
      const result = await calculatePriceEstimate(
        pickupLocation,
        dropoffLocation,
        vehicleType as 'standard' | 'executive' | 'minivan',
        serviceType as 'oneway' | 'roundtrip' | 'hourly' | 'airport',
        pickupTime
      );

      setEstimatedPrice(result.price);
      setShowPriceCalculator(true);
    } catch (error) {
      console.error('Price calculation failed:', error);
      toast.error(isDE ? 'Preis konnte nicht berechnet werden. Bitte versuchen Sie es erneut.' : 'Could not calculate price estimate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const pickupDate =
        data.pickupDate instanceof Date
          ? data.pickupDate.toLocaleDateString('de-AT')
          : new Date(data.pickupDate).toLocaleDateString('de-AT');
      const ref = `LT${Date.now().toString().slice(-8)}`;
      const subject = `Taxi booking ${ref} — ${data.customerName}`;
      const lines = [
        `Booking reference: ${ref}`,
        '',
        `Name: ${data.customerName}`,
        `Email: ${data.customerEmail}`,
        `Phone: ${data.customerPhone}`,
        '',
        `Pickup: ${data.pickupLocation}`,
        `Dropoff: ${data.dropoffLocation}`,
        `Date: ${pickupDate}`,
        `Time: ${data.pickupTime}`,
        `Passengers: ${data.passengers}`,
        `Vehicle: ${data.vehicleType}`,
        `Service: ${data.serviceType}`,
        `Payment: ${data.paymentMethod}`,
      ];
      if (estimatedPrice) lines.push(`Estimated price: €${estimatedPrice}`);
      if (data.specialRequests) lines.push('', 'Special requests:', data.specialRequests);
      window.location.href = `mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(lines.join('\n'))}`;
      toast.success(isDE ? 'Ihre E-Mail-App wird geöffnet, um Ihre Buchung zu senden…' : 'Opening your email app to send your booking…');
      reset();
      setEstimatedPrice(null);
      setShowPriceCalculator(false);
    } catch {
      toast.error(
        isDE
          ? `Etwas ist schiefgelaufen. Bitte rufen Sie uns unter ${BUSINESS_INFO.phone} an, um zu buchen.`
          : `Something went wrong. Please call us at ${BUSINESS_INFO.phone} to book.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {isDE ? 'Fahrt buchen' : 'Book Your Ride'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {isDE
              ? 'Professioneller Taxiservice in Wiener Neustadt. Rund um die Uhr für Sie verfügbar.'
              : 'Professional taxi service in Wiener Neustadt. Available 24/7 for your convenience.'}
          </p>
        </div>

        {/* Quick Call Option */}
        <div className="mb-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-center">
          <p className="text-gray-800 dark:text-gray-200 mb-2">
            <strong>{isDE ? 'Sofort abgeholt werden?' : 'Need immediate pickup?'}</strong>{' '}
            {isDE ? 'Rufen Sie uns jetzt für eine sofortige Buchung an' : 'Call us now for instant booking'}
          </p>
          <a
            href={`tel:${BUSINESS_INFO.phoneClean}`}
            className="inline-flex items-center bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
          >
            <Phone className="w-4 h-4 mr-2" />
            {BUSINESS_INFO.phone}
          </a>
        </div>

        {/* Booking Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Trip Details */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-yellow-500" />
                {isDE ? 'Fahrtdetails' : 'Trip Details'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isDE ? 'Abholort *' : 'Pickup Location *'}
                  </label>
                  <Controller
                    control={control}
                    name="pickupLocation"
                    render={({ field }) => (
                      <GooglePlacesAutocomplete
                        value={field.value || ''}
                        onChange={(value) => {
                          field.onChange(value);
                          if (value.length > 5 && watchedValues.dropoffLocation) {
                            calculateEstimatedPrice();
                          }
                        }}
                        placeholder={isDE ? 'Abholadresse eingeben' : 'Enter pickup address'}
                        error={errors.pickupLocation?.message}
                      />
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isDE ? 'Zielort *' : 'Dropoff Location *'}
                  </label>
                  <Controller
                    control={control}
                    name="dropoffLocation"
                    render={({ field }) => (
                      <GooglePlacesAutocomplete
                        value={field.value || ''}
                        onChange={(value) => {
                          field.onChange(value);
                          if (value.length > 5 && watchedValues.pickupLocation) {
                            calculateEstimatedPrice();
                          }
                        }}
                        placeholder={isDE ? 'Zieladresse eingeben' : 'Enter destination address'}
                        error={errors.dropoffLocation?.message}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isDE ? 'Art der Fahrt *' : 'Service Type *'}
                  </label>
                  <select
                    {...register('serviceType')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    onChange={(e) => {
                      register('serviceType').onChange(e);
                      calculateEstimatedPrice();
                    }}
                  >
                    <option value="oneway">{isDE ? 'Einfache Fahrt' : 'One Way'}</option>
                    <option value="roundtrip">{isDE ? 'Hin- und Rückfahrt' : 'Round Trip'}</option>
                    <option value="hourly">{isDE ? 'Stundentarif' : 'Hourly Rate'}</option>
                    <option value="airport">{isDE ? 'Flughafentransfer' : 'Airport Transfer'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isDE ? 'Fahrgäste *' : 'Passengers *'}
                  </label>
                  <select
                    {...register('passengers', { valueAsNumber: true })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {[1, 2, 3, 4].map(num => (
                      <option key={num} value={num}>
                        {isDE ? `${num} ${num === 1 ? 'Fahrgast' : 'Fahrgäste'}` : `${num} passenger${num > 1 ? 's' : ''}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 bg-gray-50 dark:bg-gray-700/40 rounded-lg p-4">
                <Car className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {isDE ? 'Fahrzeug: ' : 'Vehicle: '}
                  <strong>Jaecoo J7 SUV</strong>
                </p>
              </div>
            </div>

            {/* Date & Time */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-yellow-500" />
                {isDE ? 'Datum & Uhrzeit' : 'Date & Time'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isDE ? 'Abholdatum *' : 'Pickup Date *'}
                  </label>
                  <Controller
                    control={control}
                    name="pickupDate"
                    render={({ field }) => (
                      <DatePicker
                        selected={field.value}
                        onChange={field.onChange}
                        minDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholderText={isDE ? 'Abholdatum wählen' : 'Select pickup date'}
                      />
                    )}
                  />
                  {errors.pickupDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.pickupDate.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isDE ? 'Abholzeit *' : 'Pickup Time *'}
                  </label>
                  <select
                    {...register('pickupTime')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">{isDE ? 'Zeit wählen' : 'Select time'}</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  {errors.pickupTime && (
                    <p className="text-red-500 text-sm mt-1">{errors.pickupTime.message}</p>
                  )}
                </div>
              </div>

              {watchedValues.serviceType === 'roundtrip' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {isDE ? 'Rückfahrtdatum' : 'Return Date'}
                    </label>
                    <Controller
                      control={control}
                      name="returnDate"
                      render={({ field }) => (
                        <DatePicker
                          selected={field.value}
                          onChange={field.onChange}
                          minDate={watchedValues.pickupDate}
                          dateFormat="dd/MM/yyyy"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholderText={isDE ? 'Rückfahrtdatum wählen' : 'Select return date'}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {isDE ? 'Rückfahrtzeit' : 'Return Time'}
                    </label>
                    <select
                      {...register('returnTime')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">{isDE ? 'Zeit wählen' : 'Select time'}</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Price Estimation */}
            {(showPriceCalculator || isCalculating) && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Calculator className="w-5 h-5 mr-2 text-yellow-500" />
                  {isDE ? 'Geschätzter Preis' : 'Estimated Price'}
                </h3>
                {isCalculating ? (
                  <div className="flex items-center justify-center py-4">
                    <LoadingSpinner size="md" color="yellow" />
                    <span className="ml-2 text-gray-600 dark:text-gray-400">{isDE ? 'Preis wird berechnet…' : 'Calculating price...'}</span>
                  </div>
                ) : estimatedPrice ? (
                  <>
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                      €{estimatedPrice}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {isDE
                        ? 'Dies ist eine Schätzung auf Basis der tatsächlichen Entfernung. Der Endpreis wird nach der Buchung bestätigt.'
                        : 'This is an estimate based on real distance. Final price will be confirmed after booking.'}
                      {watchedValues.serviceType === 'hourly' && (isDE ? ' Stundentarif: €35/Stunde, mindestens 2 Stunden.' : ' Hourly rate: €35/hour minimum 2 hours.')}
                    </p>
                  </>
                ) : null}
              </div>
            )}

            {/* Customer Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Users className="w-6 h-6 mr-2 text-yellow-500" />
                {isDE ? 'Kundendaten' : 'Customer Information'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isDE ? 'Vollständiger Name *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    {...register('customerName')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder={isDE ? 'Ihr vollständiger Name' : 'Your full name'}
                  />
                  {errors.customerName && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isDE ? 'Telefonnummer *' : 'Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    {...register('customerPhone')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="+43 660 123 4567"
                  />
                  {errors.customerPhone && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerPhone.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isDE ? 'E-Mail-Adresse *' : 'Email Address *'}
                  </label>
                  <input
                    type="email"
                    {...register('customerEmail')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="your.email@example.com"
                  />
                  {errors.customerEmail && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerEmail.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isDE ? 'Zahlungsart *' : 'Payment Method *'}
                  </label>
                  <select
                    {...register('paymentMethod')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="cash">{isDE ? 'Bar' : 'Cash'}</option>
                    <option value="card">{isDE ? 'Kredit-/Debitkarte' : 'Credit/Debit Card'}</option>
                    <option value="online">{isDE ? 'Online-Zahlung' : 'Online Payment'}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {isDE ? 'Besondere Wünsche (optional)' : 'Special Requests (Optional)'}
              </label>
              <textarea
                {...register('specialRequests')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder={isDE ? 'Besondere Anforderungen, Barrierefreiheit oder zusätzliche Stopps…' : 'Any special requirements, accessibility needs, or additional stops...'}
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-yellow-500 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" color="gray" />
                    <span className="ml-2">{isDE ? 'Wird gesendet…' : 'Submitting...'}</span>
                  </>
                ) : (
                  isDE ? 'Jetzt buchen' : 'Book Now'
                )}
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phoneClean}`}
                className="bg-gray-800 dark:bg-gray-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-center flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                {isDE ? 'Lieber anrufen' : 'Call Instead'}
              </a>
            </div>
          </form>
        </div>

        {/* Information Panel */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{isDE ? 'Schnelle Antwort' : 'Quick Response'}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isDE ? 'Buchungsbestätigung innerhalb von 15 Minuten' : 'Booking confirmation within 15 minutes'}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <Car className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{isDE ? 'Professionelle Fahrer' : 'Professional Drivers'}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isDE ? 'Lizenziert, erfahren und freundlich' : 'Licensed, experienced, and courteous'}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <CreditCard className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{isDE ? 'Flexible Zahlung' : 'Flexible Payment'}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isDE ? 'Bar, Karte oder Online-Zahlung' : 'Cash, card, or online payment options'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
