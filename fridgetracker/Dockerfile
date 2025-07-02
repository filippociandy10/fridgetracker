# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copy solution file and project
COPY fridgetracker.sln ./
COPY fridgetracker/fridgetracker.csproj fridgetracker/

RUN dotnet restore fridgetracker.sln

COPY fridgetracker/ fridgetracker/

RUN dotnet publish fridgetracker/ -c Release -o out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

COPY --from=build /app/out ./
COPY --from=build /app/fridgetracker/fridgetracker.db ./fridgetracker.db

ENTRYPOINT ["dotnet", "fridgetracker.dll"]
