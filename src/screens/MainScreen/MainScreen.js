import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import Logo from '../../../assets/images/Logo_1.png';
import CustomButton from '../../components/CustomButton';

const MainScreen = () => {
    const [scopeHeight, setScopeHeight] = useState('5.0');
    const [pelletWeight, setPelletWeight] = useState('');
    const [pelletSpeed, setPelletSpeed] = useState('');
    const [firstZero, setFirstZero] = useState('');
    const [secondZero, setSecondZero] = useState('');
    const [targetDistance, setTargetDistance] = useState('');
    const [targetAngle, setTargetAngle] = useState('0');
    const [effTargetDistance, setEffTargetDistance] = useState('');
    const [joules, setJoules] = useState('');
    const [ftlb, setFtlb] = useState('');
    const [hold, setHold] = useState('');
    const [hold2, setHold2] = useState('');
    const {height} = useWindowDimensions();

    const onCalcPressed = () => {
        //console.warn(((pelletSpeed*pelletSpeed)*pelletWeight)/450240);
        //setJoules(((speed*speed)*weight)/450240 + " J");
        var footPound = ((pelletSpeed**2)*pelletWeight)/450240
        setFtlb(footPound.toFixed(1)+ " ft.lb");

        var joule = footPound*1.356
        setJoules(joule.toFixed(1) + " J");

        //var hold = (-1*(4.9033*((targetDistance/pelletSpeed)**2))-((((((-490.33*(firstZero**2))/(pelletSpeed**2))-scopeHeight)/firstZero)*targetDistance)+scopeHeight)/100)/((targetDistance/3.28084)*0.001);
        // var hold = -(4.9033*((targetDistance/pelletSpeed)**2))-(((((-490.33*(firstZero**2))-scopeHeight)/firstZero)*targetDistance) + 50);
        
        var effTargetDistance = Math.cos((targetAngle*(Math.PI/180)))*targetDistance
        setEffTargetDistance(effTargetDistance.toFixed(0));

        var pelletDrop = -490.33*(effTargetDistance/pelletSpeed)**2
        var scopeDrop = (((((-490.33*firstZero**2)/pelletSpeed**2)-scopeHeight)/firstZero)*effTargetDistance)+parseInt(scopeHeight)
        var difference = pelletDrop-scopeDrop
        var hold = difference*32.8084/effTargetDistance
        setHold(hold.toFixed(1) + " MRAD");

        var hold2 = hold*3.43775
        setHold2(hold2.toFixed(1) + " MOA");

        var secondZero = (-1*(((((-490.3*firstZero**2)/pelletSpeed**2)-scopeHeight)/firstZero))*pelletSpeed**2+((((((((-490.3*firstZero**2)/pelletSpeed**2)-scopeHeight)/firstZero))*pelletSpeed**2)**2-(1961.2*scopeHeight*pelletSpeed**2))**0.5))/980.6
        setSecondZero(secondZero.toFixed(0));
    }

    return (
        <ScrollView>
        <View style={styles.root}>
            <Image 
            source={Logo} 
            style={[styles.logo, {height: height * 0.3}]} 
            resizeMode="contain"
            />

            <Text style={[styles.baseText]}>Pellet Weight (grains)</Text>
            <CustomInput 
            placeholder="Pellet weight (grains)" 
            value={pelletWeight} 
            setValue={setPelletWeight} 
            />

            <Text style={[styles.baseText]}>Pellet Speed (ft/s)</Text>
            <CustomInput 
            placeholder="Pellet speed (feet/second)" 
            value={pelletSpeed} 
            setValue={setPelletSpeed} 
            />

            <Text style={{width: '44%', fontWeight: 'bold'}}>Energy</Text>
            <Text style = {{width: '28%'}}>{ftlb}</Text>
            <Text style = {{width: '28%'}}>{joules}</Text>

            <Text style={[styles.baseText]}>Scope Height (cm)</Text>
            <CustomInput 
            placeholder="Scope Height (cm)" 
            value={scopeHeight} 
            setValue={setScopeHeight}
            />

            <Text style={[styles.baseText]}>First Zero (ft)</Text>

            <CustomInput 
            placeholder="First zero (feet)" 
            value={firstZero} 
            setValue={setFirstZero} 
            />

            <Text style={{fontWeight: 'bold', width: '44%'}}>Second Zero (ft)</Text>
            <Text style={{width: '56%'}}>{secondZero}</Text>

            <Text style={[styles.baseText]}>Target Angle (deg)</Text>
            <CustomInput 
            placeholder="Target Angle (deg)" 
            value={targetAngle} 
            setValue={setTargetAngle} 
            />

            <Text style={[styles.baseText]}>LOS Target Dist (ft)</Text>
            <CustomInput 
            placeholder="LOS Target Distance (feet)" 
            value={targetDistance} 
            setValue={setTargetDistance} 
            />

            <Text style={{fontWeight: 'bold', width: '44%', height: 30}}>Eff Target Dist (ft)</Text>
            <Text style={{width: '56%'}}>{effTargetDistance}</Text>

            <Text style={{fontWeight: 'bold', width: '44%'}}>Hold</Text>
            <Text style={{width: '28%'}}>{hold}</Text>
            <Text style={{width: '28%'}}>{hold2}</Text>

            <CustomButton text="Calculate" onPress={onCalcPressed} />
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        //alignItems: 'center',
        padding: 20,
        
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    baseText : {
        fontWeight: 'bold',
        alignSelf: 'center',
        width: '40%',
    },
    logo: {
        //alignSelf: 'center',
        //alignItems: 'center',
        width: '70%',
        height: '35%',
        maxWidth: 300,
        maxHeight: 120,
    },
})

export default MainScreen