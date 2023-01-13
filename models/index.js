const Traveller = require('./Traveller');
const Trip = require('./Trip');
const Location = require('./Location');

Traveller.hasMany(Trip, {
    foreignKey: 'traveller_id',
    onDelete: 'CASCADE'
});

Trip.belongsTo(Traveller, {
    foreignKey: 'traveller_id'
});

Location.hasMany(Trip, {
    foreignKey: 'location_id',
    onDelete: 'CASCADE'
});

Trip.belongsTo(Location,{
    foreignKey: 'location_id'
});

module.exports = {Traveller, Trip, Location};