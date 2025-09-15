import { Button } from '@/craftrn-ui/components/Button/Button';
import { Checkbox } from '@/craftrn-ui/components/Checkbox';
import { Counter } from '@/craftrn-ui/components/Counter';
import { Radio } from '@/craftrn-ui/components/Radio';
import { SliderDual } from '@/craftrn-ui/components/SliderDual';
import { Text } from '@/craftrn-ui/components/Text';
import React, { ComponentType, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { StyleSheet, UnistylesRuntime, useUnistyles } from 'react-native-unistyles';
import { AccomodationTypeButton } from './AccomodationTypeButton';
import { FilterItem } from './FilterItem';
import { Shadow } from './Shadow';

const guestRatingOptions = {
  any: 0,
  good: 1,
  veryGood: 2,
  great: 3,
} as const;

type GuestRating = (typeof guestRatingOptions)[keyof typeof guestRatingOptions];

const Divider = () => {
  
  return <View style={styles.divider} />;
};

export const StaysFiltersScreen: ComponentType = () => {
  const { theme } = useUnistyles();
  const frame = useSafeAreaFrame();
  const [accomodationTypes, setAccomodationTypes] = useState(['stays']);
  const [priceRange, setPriceRange] = useState({ min: 500, max: 3000 });
  const [guestRating, setGuestRating] = useState<GuestRating>(
    guestRatingOptions.any,
  );
  const [amenitiesSelected, setAmenitiesSelected] = useState(['pool', 'wifi']);

  const handleToggleAccomodationType = (type: string) => () => {
    if (accomodationTypes.includes(type)) {
      setAccomodationTypes(prev => prev.filter(t => t !== type));
    } else {
      setAccomodationTypes(prev => [...prev, type]);
    }
  };

  const handlePressGuestRating = (rating: GuestRating) => () =>
    setGuestRating(rating);

  const handleToggleAmenities = (amenities: string) => () =>
    setAmenitiesSelected((prev: string[]) => {
      const index = prev.indexOf(amenities);
      if (index === -1) {
        return [...prev, amenities];
      }
      return prev.filter((_, i) => i !== index);
    });

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Accomodation type</Text>
          <View style={styles.buttonContainer}>
            <AccomodationTypeButton
              selected={accomodationTypes.includes('stays')}
              onPress={handleToggleAccomodationType('stays')}
            >
              Stays
            </AccomodationTypeButton>
            <AccomodationTypeButton
              selected={accomodationTypes.includes('hostel')}
              onPress={handleToggleAccomodationType('hostel')}
            >
              Hostel
            </AccomodationTypeButton>
            <AccomodationTypeButton
              selected={accomodationTypes.includes('guesthouse')}
              onPress={handleToggleAccomodationType('guesthouse')}
            >
              Guesthouse
            </AccomodationTypeButton>
            <AccomodationTypeButton
              selected={accomodationTypes.includes('home')}
              onPress={handleToggleAccomodationType('home')}
            >
              Home
            </AccomodationTypeButton>
            <AccomodationTypeButton
              selected={accomodationTypes.includes('appartment')}
              onPress={handleToggleAccomodationType('appartment')}
            >
              Appartment
            </AccomodationTypeButton>
          </View>
          <Divider />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Price range</Text>
          <Text variant="body3" style={styles.sectionSubheader}>
            Total prices for the duration of your travel
          </Text>
          <View style={styles.priceRangeContainer}>
            <View style={styles.priceRangeLabels}>
              <Text style={styles.priceLabel}>${priceRange.min}</Text>
              <Text style={styles.priceLabel}>${priceRange.max}</Text>
            </View>
            <View style={styles.sliderContainer}>
              <SliderDual
                min={500}
                max={3000}
                step={10}
                onValuesChange={setPriceRange}
                width={frame.width - theme.spacing.large * 2}
              />
            </View>
          </View>
          <Divider />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Guest rating</Text>
          <View style={styles.listContainer}>
            <FilterItem
              label="All ratings"
              onPress={handlePressGuestRating(guestRatingOptions.any)}
              rightAccessory={
                <Radio checked={guestRating === guestRatingOptions.any} />
              }
            />
            <FilterItem
              label="Good 3.5+"
              onPress={handlePressGuestRating(guestRatingOptions.good)}
              rightAccessory={
                <Radio checked={guestRating === guestRatingOptions.good} />
              }
            />
            <FilterItem
              label="Very good 4+"
              onPress={handlePressGuestRating(guestRatingOptions.veryGood)}
              rightAccessory={
                <Radio checked={guestRating === guestRatingOptions.veryGood} />
              }
            />
            <FilterItem
              label="Great 4.5+"
              onPress={handlePressGuestRating(guestRatingOptions.great)}
              rightAccessory={
                <Radio checked={guestRating === guestRatingOptions.great} />
              }
            />
          </View>
          <Divider />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Rooms and beds</Text>
          <View style={styles.listContainer}>
            <FilterItem
              label="Bedrooms"
              rightAccessory={<Counter onValueChange={() => {}} />}
            />
            <FilterItem
              label="Beds"
              rightAccessory={<Counter onValueChange={() => {}} />}
            />
            <FilterItem
              label="Bathrooms"
              rightAccessory={<Counter onValueChange={() => {}} />}
            />
          </View>
          <Divider />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Amenities</Text>
          <View style={styles.listContainer}>
            <FilterItem
              label="Airport shuttle"
              onPress={handleToggleAmenities('airportShuttle')}
              rightAccessory={
                <Checkbox
                  checked={amenitiesSelected.includes('airportShuttle')}
                />
              }
            />
            <FilterItem
              label="Swimming pool"
              onPress={handleToggleAmenities('pool')}
              rightAccessory={
                <Checkbox checked={amenitiesSelected.includes('pool')} />
              }
            />
            <FilterItem
              label="Restaurant"
              onPress={handleToggleAmenities('restaurant')}
              rightAccessory={
                <Checkbox checked={amenitiesSelected.includes('restaurant')} />
              }
            />
            <FilterItem
              label="Wifi"
              onPress={handleToggleAmenities('wifi')}
              rightAccessory={
                <Checkbox checked={amenitiesSelected.includes('wifi')} />
              }
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.footerShadow}>
          <Shadow />
        </View>
        <Button onPress={() => {}}>Show results</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    paddingBottom: theme.spacing.large + UnistylesRuntime.insets.bottom,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    gap: theme.spacing.medium,
    paddingTop: theme.spacing.small,
    paddingBottom: theme.spacing.large,
  },
  section: {
    gap: theme.spacing.medium,
  },
  sectionHeader: {
    ...theme.textVariants.body3,
    color: theme.colors.contentTertiary,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginHorizontal: theme.spacing.large,
  },
  buttonContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: theme.spacing.medium,
    flexWrap: 'wrap',
    marginHorizontal: theme.spacing.large,
  },
  divider: {
    borderBottomColor: theme.colors.borderPrimary,
    borderBottomWidth: 1,
  },
  sectionSubheader: {
    marginHorizontal: theme.spacing.large,
  },
  priceRangeContainer: {
    gap: theme.spacing.large,
    marginHorizontal: theme.spacing.large,
  },
  priceRangeLabels: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  priceLabel: {
    ...theme.textVariants.body2,
    fontWeight: 'bold',
  },
  sliderContainer: {
    alignItems: 'center',
  },
  listContainer: {
    marginHorizontal: theme.spacing.large,
  },
  footer: {
    backgroundColor: theme.colors.backgroundPrimary,
    paddingHorizontal: theme.spacing.large,
    paddingTop: theme.spacing.medium,
    position: 'relative',
  },
  footerShadow: {
    position: 'absolute',
    top: -5,
    left: 0,
    right: 0,
    height: 5,
    opacity: 0.1,
  },
}));
